import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { z } from 'zod';
import { ApiError } from '../../utils';
import Order from '../Order/order.model';
import Product from '../Product/product.model';
import Cart from './cart.model';
import { CartValidation } from './cart.validation';

// Save a new card into the database
const saveCartIntoDB = async (
  userId: string,
  payload: z.infer<typeof CartValidation.cartValidationSchema>,
) => {
  const { orders } = payload;

  // Find all products depend on requested order list
  const products = await Product.find({
    _id: { $in: orders.map((x) => x.product) },
  }).select('stock price');

  // Create a map to easily access product stock and price by product ID
  const productMap = new Map();
  products.forEach((product) => {
    productMap.set(product._id.toString(), {
      stock: product.stock,
      price: product.price,
    });
  });

  let totalAmount = 0;

  orders.forEach((order) => {
    const productId = order.product.toString();

    const isProductExist = productMap.has(productId);

    if (!isProductExist) {
      throw new Error(`${productId} product id does not exist.`);
    }

    const { stock, price } = productMap.get(productId);
    if (stock < order.quantity) {
      throw new Error(
        `${productId} product id does not have enough stock. Available: ${stock}, Ordered: ${order.quantity}`,
      );
    }

    totalAmount += order.quantity * price;
  });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Insert order at a time to the database
    const ordersData = orders.map((order) => ({
      user: userId,
      product: order.product,
      quantity: order.quantity,
    }));

    const orderResult = await Order.insertMany(ordersData, { session });

    const orderIds = orderResult.map((order) => order._id);

    const cartData = {
      user: userId,
      orders: orderIds,
      totalAmount,
    };

    // Create cart into the database
    const cartResult = await Cart.create([cartData], { session });

    // Reduce stock in product documents
    const bulkOperations = orders.map((order) => ({
      updateOne: {
        filter: { _id: order.product },
        update: { $inc: { stock: -order.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOperations, { session });

    await session.commitTransaction();
    await session.endSession();

    // Populate the cart with order details
    const populatedCart = await Cart.populate(cartResult, {
      path: 'orders',
      populate: {
        path: 'product',
        model: 'Product',
        select: 'name brand price rating image',
        populate: {
          path: 'brand',
          model: 'Brand',
          transform: (doc) => doc.name,
        },
      },
    });

    // Return populated cart
    return populatedCart;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong during save cart data',
    );
  }
};

export const CartService = {
  saveCartIntoDB,
};

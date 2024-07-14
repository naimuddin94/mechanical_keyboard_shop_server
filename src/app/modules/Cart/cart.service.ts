import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { z } from 'zod';
import { ApiError } from '../../utils';
import Order from '../Order/order.model';
import Product from '../Product/product.model';
import Cart from './cart.model';
import { CartValidation } from './cart.validation';

const saveCartIntoDB = async (
  userId: string,
  payload: z.infer<typeof CartValidation.cartValidationSchema>,
) => {
  const { orders, address, city, state, zip, phone, paymentInfo } = payload;

  // Step 1: Validate orders and fetch product details
  const productIds = orders.map((order) => order.product);
  const products = await Product.find({ _id: { $in: productIds } }).select(
    'stock price',
  );

  // Create a map for quick lookup of product details
  const productMap = new Map(
    products.map((product) => [product._id.toString(), product]),
  );

  // Step 2: Validate orders against available stock
  let totalAmount = 0;
  orders.forEach((order) => {
    const product = productMap.get(order.product.toString());

    if (!product) {
      throw new Error(`${order.product} product id does not exist.`);
    }

    if (Number(product.stock) < Number(order.quantity)) {
      throw new Error(
        `${product._id} product id does not have enough stock. Available: ${product.stock}, Ordered: ${order.quantity}`,
      );
    }

    totalAmount += order.quantity * product.price;
  });

  // Step 3: Start a Mongoose session and transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 4: Insert orders into the Order collection
    const ordersData = orders.map((order) => ({
      user: userId,
      product: order.product,
      quantity: order.quantity,
    }));

    const orderResult = await Order.insertMany(ordersData, { session });
    const orderIds = orderResult.map((order) => order._id);

    // Step 5: Create the cart document
    const cartData = {
      user: userId,
      orders: orderIds,
      totalAmount,
      address,
      city,
      state,
      zip,
      phone,
      paymentInfo,
    };

    const cartResult = await Cart.create([cartData], { session });

    // Step 6: Update product stock
    const bulkOperations = orders.map((order) => ({
      updateOne: {
        filter: { _id: order.product },
        update: { $inc: { stock: -order.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOperations, { session });

    // Step 7: Commit transaction
    await session.commitTransaction();
    await session.endSession();

    // Step 8: Populate and return the cart with order details
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

    return populatedCart;
  } catch (error) {
    // Step 9: Handle errors and abort transaction
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong during save cart data',
    );
  }
};

const getSingleCartDataFromDB = async (user: string) => {
  const result = await Cart.find({
    user,
    status: { $ne: 'received' },
  }).populate({
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
  return result;
};

const changeCartStatusIntoDB = async (id: string, status: string) => {
  const result = await Cart.findOneAndUpdate(
    { _id: id, isDeleted: { $ne: true } },
    { status },
    { new: true },
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  return result;
};

export const CartService = {
  saveCartIntoDB,
  getSingleCartDataFromDB,
  changeCartStatusIntoDB,
};

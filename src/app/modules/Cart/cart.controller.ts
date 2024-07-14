import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { CartService } from './cart.service';

// Create a new cart
const createCart = asyncHandler(async (req, res) => {
  const result = await CartService.saveCartIntoDB(req.user.id, req.body);

  res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, result, 'Thank you for your orders'),
    );
});

// Fetch cart information from the database
const fetchCartByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = await CartService.getSingleCartDataFromDB(userId);

  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Cart retrieved successfully'),
    );
});

// Change cart status information
const changeCartStatus = asyncHandler(async (req, res) => {
  const cartId = req.params.id;
  const { status } = req.body;

  const result = await CartService.changeCartStatusIntoDB(cartId, status);

  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(
        httpStatus.OK,
        result,
        'Cart status changed successfully',
      ),
    );
});

export const CartController = {
  createCart,
  fetchCartByUserId,
  changeCartStatus,
};

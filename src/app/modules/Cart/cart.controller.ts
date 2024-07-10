import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { CartService } from './cart.service';

// Create a new cart
const createCart = asyncHandler(async (req, res) => {
  const result = await CartService.saveCartIntoDB(req.user.id, req.body);

  res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, result, 'Cart saved successfully'),
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

export const CartController = {
  createCart,
  fetchCartByUserId,
};

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

export const CartController = {
  createCart,
};

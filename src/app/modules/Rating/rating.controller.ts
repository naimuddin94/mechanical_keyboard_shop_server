import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { RatingService } from './rating.service';

// Create a new rating
const createRating = asyncHandler(async (req, res) => {
  const result = await RatingService.saveRatingIntoDB(req);
  res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, result, 'Thanks for your feedback'),
    );
});

// Fetch all ratings
const fetchAllRatings = asyncHandler(async (req, res) => {
  const result = await RatingService.getAllRatingFromDB();
  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Ratings retrieved successfully'),
    );
});

// Fetch single rating from the database
const fetchSingleRating = asyncHandler(async (req, res) => {
  const result = await RatingService.getSingleRatingFromDB(req);

  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Rating retrieved successfully'),
    );
});

// Fetch all ratings depending on product
const fetchAllRatingsOnProductId = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const query = req.query;
  const result = await RatingService.getRatingsOnProductId(productId, query);
  res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, result, 'Ratings retrieved successfully'),
    );
});

export const RatingController = {
  createRating,
  fetchAllRatings,
  fetchSingleRating,
  fetchAllRatingsOnProductId,
};

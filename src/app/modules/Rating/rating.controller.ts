import httpStatus from 'http-status';
import { ApiResponse, asyncHandler } from '../../utils';
import { RatingService } from './rating.service';

// Create a new rating
const createRating = asyncHandler(async (req, res) => {
  const result = await RatingService.saveRatingIntoDB(req);
  res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, result, 'Rating saved successfully'),
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

export const RatingController = {
  createRating,
  fetchAllRatings,
  fetchSingleRating,
};

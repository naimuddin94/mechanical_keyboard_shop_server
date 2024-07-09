import { Request } from 'express';
import Rating from './rating.model';

// Save rating into the database
const saveRatingIntoDB = async (req: Request) => {
  const { product, rating } = req.body;
  const user = req.user.id;
  const isExistRating = await Rating.findOne({ product, user });

  if (isExistRating) {
    isExistRating.rating = rating;
    const result = await isExistRating.save();
    return result;
  }

  const result = await Rating.create({ product, user, rating });
  return result;
};

// Fetch all rating information from the database
const getAllRatingFromDB = async () => {
  const result = await Rating.find();
  return result;
};

// Fetch single rating information from the database
const getSingleRatingFromDB = async (req: Request) => {
  const user = req.user.id;
  const product = req.params.id;

  const result = await Rating.findOne({ user, product });
  return result;
};

export const RatingService = {
  saveRatingIntoDB,
  getAllRatingFromDB,
  getSingleRatingFromDB,
};

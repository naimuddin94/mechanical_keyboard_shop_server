import { Request } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { ApiError } from '../../utils';
import Product from '../Product/product.model';
import Rating from './rating.model';

// Save rating into the database
const saveRatingIntoDB = async (req: Request) => {
  const { product, rating, feedback } = req.body;
  const user = req.user.id;
  const isExistRating = await Rating.findOne({ product, user });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let result;

    if (isExistRating) {
      if (rating) {
        isExistRating.rating = rating;
      }
      if (feedback) {
        isExistRating.feedback = feedback;
      }
      result = await isExistRating.save({ session });
    } else {
      const resultArray = await Rating.create(
        [{ product, user, rating, feedback }],
        {
          session,
        },
      );
      result = resultArray[0];
    }

    // Fetch all ratings for the product
    const productAllRatings = await Rating.find({ product }).session(session);

    // Calculate the average rating
    const totalRatings = productAllRatings.reduce(
      (acc, curr) => acc + curr.rating,
      0,
    );
    const averageRating = Math.floor(totalRatings / productAllRatings.length);

    // Update the product's rating field with the average rating
    await Product.findByIdAndUpdate(product, { rating: averageRating }).session(
      session,
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong during update rating',
    );
  }
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

// Fetch all rating depend on the product
const getRatingsOnProductId = async (
  productId: string,
  query: Record<string, unknown>,
) => {
  const productQuery = new QueryBuilder(
    Rating.find({ product: productId }).populate({
      path: 'user',
      select: 'name image',
    }),
    query,
  )
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const RatingService = {
  saveRatingIntoDB,
  getAllRatingFromDB,
  getSingleRatingFromDB,
  getRatingsOnProductId,
};

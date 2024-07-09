import { Types } from 'mongoose';
import { z } from 'zod';

const ratingValidationSchema = z.object({
  user: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  product: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  rating: z.number().positive().min(1).max(5),
});

const createRatingValidationSchema = z.object({
  body: ratingValidationSchema,
});

export const RatingValidation = {
  ratingValidationSchema,
  createRatingValidationSchema,
};

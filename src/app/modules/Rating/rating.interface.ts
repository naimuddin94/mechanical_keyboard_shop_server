/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';
import { z } from 'zod';
import { RatingValidation } from './rating.validation';

export interface IRating
  extends z.infer<typeof RatingValidation.ratingValidationSchema> {
  user: Types.ObjectId;
}

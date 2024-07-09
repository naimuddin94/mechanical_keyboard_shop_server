import { Schema, model } from 'mongoose';
import { IRating } from './rating.interface';

const brandSchema = new Schema<IRating>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Rating = model<IRating>('Rating', brandSchema);

export default Rating;

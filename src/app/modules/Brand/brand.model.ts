import { Schema, model } from 'mongoose';
import { IBrand, IBrandModel } from './brand.interface';

const brandSchema = new Schema<IBrand, IBrandModel>({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: false,
  },
});

// Check that the brand name exists to database
brandSchema.statics.isUserExists = async function (name: string) {
  const result = await Brand.findOne({ name });
  return result;
};

const Brand = model<IBrand, IBrandModel>('Brand', brandSchema);

export default Brand;

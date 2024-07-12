import { Schema, model } from 'mongoose';
import { IBrand, IBrandModel } from './brand.interface';

const brandSchema = new Schema<IBrand, IBrandModel>(
  {
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Check that the brand name exists to database
brandSchema.statics.isBrandNameExists = async function (name: string) {
  const result = await Brand.findOne({ name: { $regex: name, $options: 'i' } });
  return result;
};

const Brand = model<IBrand, IBrandModel>('Brand', brandSchema);

export default Brand;

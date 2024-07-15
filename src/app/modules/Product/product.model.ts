import { Schema, model } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  },
);

const productSchema = new Schema<IProduct, IProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    material: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    brand: {
      type: brandSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

// Check that the product name exists to database
productSchema.statics.isProductNameExists = async function (name: string) {
  const result = await Product.findOne({ name });
  return result;
};

const Product = model<IProduct, IProductModel>('Product', productSchema);

export default Product;

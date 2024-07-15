/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import { ProductValidation } from './product.validation';

export interface IProduct
  extends Pick<
    z.infer<typeof ProductValidation.productValidationSchema>,
    | 'name'
    | 'price'
    | 'rating'
    | 'stock'
    | 'description'
    | 'material'
    | 'weight'
  > {
  image: string;
  brand: { name: string; origin: string };
  isDeleted: boolean;
}

export interface IProductModel extends Model<IProduct, Record<string, never>> {
  isProductNameExists(name: string): Promise<HydratedDocument<IProduct>>;
}

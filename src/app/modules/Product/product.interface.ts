/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import { ProductValidation } from './product.validation';

export interface IProduct
  extends z.infer<typeof ProductValidation.productValidationSchema> {}

export interface IProductModel extends Model<IProduct, Record<string, never>> {
  isProductNameExists(name: string): Promise<HydratedDocument<IProduct>>;
}

/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';
import { z } from 'zod';
import { BrandValidation } from './brand.validation';

export interface IBrand
  extends z.infer<typeof BrandValidation.brandValidationSchema> {}

export interface IUserModel extends Model<IBrand, Record<string, never>> {
  isBrandNameExists(email: string): Promise<HydratedDocument<IBrand>>;
}

import { Types } from 'mongoose';
import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be string',
  }),
  description: z.string({
    required_error: 'Product description is required',
    invalid_type_error: 'Product description must be a valid string',
  }),
  brand: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  price: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return Number(arg);
    }
    return arg;
  }, z.number().positive()),
  stock: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return Number(arg);
    }
    return arg;
  }, z.number().positive()),
  rating: z.number().positive().min(1).max(5).optional(),
  isDeleted: z
    .boolean({ message: 'Product is deleted field is boolean' })
    .optional(),
});

const createProductValidationSchema = z.object({
  body: productValidationSchema,
});

const updateProductValidationSchema = z.object({
  body: productValidationSchema.partial(),
});

export const ProductValidation = {
  productValidationSchema,
  createProductValidationSchema,
  updateProductValidationSchema,
};

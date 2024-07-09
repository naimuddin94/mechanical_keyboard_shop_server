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
  stock: z
    .number({
      required_error: 'Product stock is required',
      invalid_type_error: 'Product stock must be a valid number',
    })
    .positive({ message: 'Stock must be positive number' })
    .optional(),
  rating: z
    .number({
      required_error: 'Product rating is required',
      invalid_type_error: 'Product rating must be a valid number',
    })
    .optional(),
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

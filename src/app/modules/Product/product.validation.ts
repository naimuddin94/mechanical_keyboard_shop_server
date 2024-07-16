import { z } from 'zod';

// 20501430100460005

const productValidationSchema = z.object({
  name: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be string',
  }),
  description: z.string({
    required_error: 'Product description is required',
    invalid_type_error: 'Product description must be a valid string',
  }),
  material: z.string({
    required_error: 'Material is required',
    invalid_type_error: 'Material must be a valid string',
  }),
  weight: z.string({
    required_error: 'Weight is required',
    invalid_type_error: 'Weight must be a valid string',
  }),
  brand: z.string({
    required_error: 'Brand is required',
    invalid_type_error: 'Brand must be a valid string',
  }),
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

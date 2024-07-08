import { Types } from 'mongoose';
import { z } from 'zod';

const brandValidationSchema = z.object({
  name: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be string',
  }),
  image: z.string({
    required_error: 'Product image is required',
    invalid_type_error: 'Product image must be a valid string',
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
  price: z.number({
    required_error: 'Product price is required',
    invalid_type_error: 'Product price must be a valid number',
  }),
  stock: z
    .number({
      required_error: 'Product stock is required',
      invalid_type_error: 'Product stock must be a valid number',
    })
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

const createBandValidationSchema = z.object({
  body: brandValidationSchema,
});

export const BrandValidation = {
  brandValidationSchema,
  createBandValidationSchema,
};

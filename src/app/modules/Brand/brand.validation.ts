import { z } from 'zod';

const brandValidationSchema = z.object({
  name: z.string({
    required_error: 'Brand name is required',
    invalid_type_error: 'Brand name must be string',
  }),
  origin: z.string({
    required_error: 'Brand origin is required',
    invalid_type_error: 'Brand origin must be string',
  }),
});

const createBandValidationSchema = z.object({
  body: brandValidationSchema,
});

export const BrandValidation = {
  brandValidationSchema,
  createBandValidationSchema,
};

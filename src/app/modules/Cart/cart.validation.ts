import { Types } from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  product: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Types.ObjectId(arg);
    }
    return arg;
  }, z.instanceof(Types.ObjectId)),
  quantity: z.number().positive(),
});

const cartValidationSchema = z.object({
  orders: z.array(orderValidationSchema),
});

const createCartValidationSchema = z.object({
  body: cartValidationSchema,
});

export const CartValidation = {
  cartValidationSchema,
  createCartValidationSchema,
};

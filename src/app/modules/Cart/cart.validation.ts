import { Types } from 'mongoose';
import { z } from 'zod';
import { cartStatus } from './cart.util';

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
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  phone: z.string(),
  paymentInfo: z.string().optional(),
  orders: z.array(orderValidationSchema),
});

const createCartValidationSchema = z.object({
  body: cartValidationSchema,
});

const changeCartStatus = z.object({
  body: z.object({
    status: z.enum(cartStatus),
  }),
});

export const CartValidation = {
  cartValidationSchema,
  createCartValidationSchema,
  changeCartStatus,
};

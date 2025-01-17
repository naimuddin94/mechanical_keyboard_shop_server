import { z } from 'zod';
import { role } from './user.constant';

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    })
    .min(2)
    .max(100),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email format' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4, { message: 'Password must be at least 4 characters' })
    .max(20, { message: 'Password no longer that 20 characters' }),
  address: z
    .string({
      required_error: 'Address is required',
    })
    .optional(),
  role: z
    .enum([...role] as [string], {
      message: 'Role is required in valid format user or admin',
    })
    .optional(),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email format' }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, { message: 'Password must be at least 4 characters' })
      .max(20, { message: 'Password no longer that 20 characters' }),
  }),
});

const createUserValidationSchema = z.object({
  body: userValidationSchema,
});

const updateUserValidationSchema = z.object({
  body: userValidationSchema.partial(),
});

export const UserValidation = {
  userValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
  loginUserValidationSchema,
};

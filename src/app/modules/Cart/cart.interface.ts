import { Types } from 'mongoose';
import { cartStatus } from './cart.util';

export interface ICart {
  user: Types.ObjectId;
  orders: [Types.ObjectId];
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  paymentInfo: string;
  isConfirmed: boolean;
  totalAmount: number;
  status: (typeof cartStatus)[number];
  isDeleted: boolean;
}

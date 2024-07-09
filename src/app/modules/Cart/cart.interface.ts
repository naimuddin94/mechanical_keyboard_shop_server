import { Types } from 'mongoose';
import { cartStatus } from './cart.util';

export interface ICart {
  user: Types.ObjectId;
  orders: [Types.ObjectId];
  isConfirmed: boolean;
  status: typeof cartStatus[number];
}

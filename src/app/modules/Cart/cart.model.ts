import { model, Schema } from 'mongoose';
import { ICart } from './cart.interface';
import { cartStatus } from './cart.util';

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: 'Order',
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: cartStatus,
      default: 'processing',
    },
  },
  {
    timestamps: true,
  },
);

const Cart = model('Cart', cartSchema);

export default Cart;

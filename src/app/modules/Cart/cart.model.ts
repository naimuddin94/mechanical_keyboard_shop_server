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
    totalAmount: {
      type: Number,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// filter out deleted documents
cartSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

cartSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

cartSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Cart = model('Cart', cartSchema);

export default Cart;

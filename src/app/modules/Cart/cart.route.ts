import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';

const router = Router();

router
  .route('/')
  .post(
    auth('admin', 'user'),
    validateRequest(CartValidation.createCartValidationSchema),
    CartController.createCart,
  );

router
  .route('/my-orders')
  .get(auth('admin', 'user'), CartController.fetchCartByUserId);

export const cartRouter = router;

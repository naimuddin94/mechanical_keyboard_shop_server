import { Router } from 'express';
import { brandRouter } from '../modules/Brand/brand.route';
import { cartRouter } from '../modules/Cart/cart.route';
import { productRouter } from '../modules/Product/product.route';
import { ratingRouter } from '../modules/Rating/rating.route';
import { userRouter } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/brands',
    route: brandRouter,
  },
  {
    path: '/products',
    route: productRouter,
  },
  {
    path: '/ratings',
    route: ratingRouter,
  },
  {
    path: '/carts',
    route: cartRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

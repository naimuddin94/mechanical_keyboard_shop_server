import { Router } from 'express';
import { brandRouter } from '../modules/Brand/brand.route';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

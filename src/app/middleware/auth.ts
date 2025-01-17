import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import User from '../modules/User/user.model';
import { ApiError, asyncHandler } from '../utils';

const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token =
        req.header('Authorization')?.replace('Bearer ', '') ||
        req.cookies?.token;

      // checking if the token is missing
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.access_token_secret as string,
      ) as JwtPayload;

      const { role, id, iat } = decoded;

      // checking if the user is exist
      const user = await User.findById(id);

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
      }

      // Check if the user password changed

      if (
        user.passwordChangedAt &&
        User.isJWTIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number,
        )
      ) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;

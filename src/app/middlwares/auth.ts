import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/user/user.model';
import { Role } from '../modules/role/role.model';
import catchAsync from '../utlis/catchAsync';

const auth = (...requiredPermissions: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // checking if the token is missing
    if (!authHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user is exist (userId now holds email)
    const user = await User.isUserExistsByEmail(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    // Checking permissions against DB
    const userRole = await Role.findOne({ name: role, isDeleted: false });
    
    if (!userRole) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Role not found or deleted!');
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      // Allow access if the user has AT LEAST ONE of the required permissions
      const hasPermission = requiredPermissions.some(permission => 
        userRole.permissions.includes(permission)
      );

      if (!hasPermission) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You do not have the required permissions!',
        );
      }
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;


import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (password: string, payload: TUser) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);
  userData.role = payload.role;
  userData.email = payload.email;
  userData.name = payload.name;

  const newUser = await User.create(userData);

  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};

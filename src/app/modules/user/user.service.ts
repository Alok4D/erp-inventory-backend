import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Role } from '../role/role.model';

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

const getMe = async (userId: string, role: string) => {
  const result = await User.findOne({ email: userId, role });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Fetch user role permissions
  let permissions: string[] = [];
  const userRole = await Role.findOne({ name: result.role, isDeleted: false });
  if (userRole) {
    permissions = userRole.permissions;
  }

  return {
    ...result.toObject(),
    permissions,
  };
};

export const UserServices = {
  createUserIntoDB,
  getMe,
};

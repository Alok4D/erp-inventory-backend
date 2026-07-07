import { Model } from 'mongoose';

export type TRole = {
  name: string;
  permissions: string[];
  isDeleted: boolean;
};

export type RoleModel = Model<TRole>;

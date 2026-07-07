import { Schema, model } from 'mongoose';
import { RoleModel, TRole } from './role.interface';

const roleSchema = new Schema<TRole, RoleModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      default: [],
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

export const Role = model<TRole, RoleModel>('Role', roleSchema);

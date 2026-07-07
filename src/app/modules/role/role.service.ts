import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRole } from './role.interface';
import { Role } from './role.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createRoleIntoDB = async (payload: TRole) => {
  const result = await Role.create(payload);
  return result;
};

const getAllRolesFromDB = async (query: Record<string, unknown>) => {
  const roleQuery = new QueryBuilder(Role.find({ isDeleted: false }), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await roleQuery.modelQuery;
  const meta = await roleQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getRoleByIdFromDB = async (id: string) => {
  const result = await Role.findById(id);
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return result;
};

const updateRoleInDB = async (id: string, payload: Partial<TRole>) => {
  const result = await Role.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return result;
};

const deleteRoleFromDB = async (id: string) => {
  // Check if role exists and not deleted
  const isRoleExist = await Role.findById(id);
  if (!isRoleExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Role not found');
  }

  // Prevent deleting critical roles
  if (['admin', 'manager', 'employee'].includes(isRoleExist.name.toLowerCase())) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cannot delete system default roles');
  }

  const result = await Role.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const RoleServices = {
  createRoleIntoDB,
  getAllRolesFromDB,
  getRoleByIdFromDB,
  updateRoleInDB,
  deleteRoleFromDB,
};

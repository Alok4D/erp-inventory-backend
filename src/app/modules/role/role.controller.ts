import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { RoleServices } from './role.service';

const createRole = catchAsync(async (req, res) => {
  const result = await RoleServices.createRoleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Role created successfully',
    data: result,
  });
});

const getAllRoles = catchAsync(async (req, res) => {
  const result = await RoleServices.getAllRolesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Roles retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getRoleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoleServices.getRoleByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role retrieved successfully',
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoleServices.updateRoleInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role updated successfully',
    data: result,
  });
});

const deleteRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoleServices.deleteRoleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Role deleted successfully',
    data: result,
  });
});

export const RoleControllers = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};

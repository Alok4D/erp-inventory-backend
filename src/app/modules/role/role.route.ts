import express from 'express';
import { RoleControllers } from './role.controller';
import auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/',
  auth('manage_roles'),
  RoleControllers.createRole,
);

router.get(
  '/',
  auth('manage_roles'),
  RoleControllers.getAllRoles,
);

router.get(
  '/:id',
  auth('manage_roles'),
  RoleControllers.getRoleById,
);

router.patch(
  '/:id',
  auth('manage_roles'),
  RoleControllers.updateRole,
);

router.delete(
  '/:id',
  auth('manage_roles'),
  RoleControllers.deleteRole,
);

export const RoleRoutes = router;

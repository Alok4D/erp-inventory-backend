import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlwares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// A simple open route to create the initial admin/manager/employee for testing
router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.employee),
  UserControllers.getMe,
);

export const UserRoutes = router;

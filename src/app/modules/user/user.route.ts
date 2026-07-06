import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlwares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// A simple open route to create the initial admin/manager/employee for testing
router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;

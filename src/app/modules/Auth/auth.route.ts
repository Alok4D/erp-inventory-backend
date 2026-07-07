import express from 'express';
import { USER_ROLE } from './../user/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlwares/validateRequest';
import auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);


router.post(
  '/change-password',
  auth(),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post('/logout', AuthControllers.logoutUser);

export const AuthRoutes = router;

import express from 'express';
import { DashboardControllers } from './dashboard.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/summary',
  auth(USER_ROLE.admin, USER_ROLE.manager), // Only Admin and Manager can view dashboard summary
  DashboardControllers.getDashboardSummary,
);

export const DashboardRoutes = router;

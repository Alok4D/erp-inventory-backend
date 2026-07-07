import express from 'express';
import { DashboardControllers } from './dashboard.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/summary',
  auth('view_dashboard'), // Check view_dashboard permission
  DashboardControllers.getDashboardSummary,
);

export const DashboardRoutes = router;

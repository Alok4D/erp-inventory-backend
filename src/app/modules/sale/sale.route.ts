import express from 'express';
import { SaleControllers } from './sale.controller';
import validateRequest from '../../middlwares/validateRequest';
import { SaleValidation } from './sale.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.employee), // Any logged-in user can make a sale
  validateRequest(SaleValidation.createSaleValidationSchema),
  SaleControllers.createSale,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager), // Only Admin and Manager can view sales history
  SaleControllers.getAllSales,
);

export const SaleRoutes = router;

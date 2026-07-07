import express from 'express';
import { SaleControllers } from './sale.controller';
import validateRequest from '../../middlwares/validateRequest';
import { SaleValidation } from './sale.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth('create_sale'),
  validateRequest(SaleValidation.createSaleValidationSchema),
  SaleControllers.createSale,
);

router.get(
  '/',
  auth('view_sales'),
  SaleControllers.getAllSales,
);

router.delete(
  '/:id',
  auth('delete_sale'),
  SaleControllers.deleteSale,
);

export const SaleRoutes = router;

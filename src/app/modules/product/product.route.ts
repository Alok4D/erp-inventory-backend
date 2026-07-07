import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlwares/validateRequest';
import { ProductValidation } from './product.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';
import { upload } from '../../utlis/uploadImage';
import { parseDataField } from '../../middlwares/parseDataField';

const router = express.Router();

router.post(
  '/',
  auth('create_product'),
  upload.single('image'), 
  parseDataField, 
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get(
  '/',
  auth('view_products'),
  ProductControllers.getAllProducts,
);

router.patch(
  '/:id',
  auth('update_product'),
  upload.single('image'),
  parseDataField,
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  '/:id',
  auth('delete_product'),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = router;

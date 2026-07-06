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
  auth(USER_ROLE.admin, USER_ROLE.manager), // Only Admin and Manager can add products
  upload.single('image'), // Expect an 'image' file in the form data
  parseDataField, // Parse the 'data' JSON string in the form body
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.employee), // Anyone logged in can view products
  ProductControllers.getAllProducts,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  upload.single('image'),
  parseDataField,
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = router;

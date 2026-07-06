import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find().sort({ createdAt: -1 });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};

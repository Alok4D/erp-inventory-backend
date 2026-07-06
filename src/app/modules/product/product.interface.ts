import { Model } from 'mongoose';

export interface TProduct {
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  imageUrl: string;
}

export type ProductModel = Model<TProduct>;

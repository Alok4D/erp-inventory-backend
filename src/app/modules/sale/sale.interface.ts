import { Types } from 'mongoose';

export interface TSaleItem {
  product: Types.ObjectId;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface TSale {
  items: TSaleItem[];
  totalAmount: number;
  soldBy: string; // email of the user who made the sale
  createdAt?: Date;
  updatedAt?: Date;
}

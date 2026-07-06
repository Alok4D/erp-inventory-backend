import { Schema, model } from 'mongoose';
import { TSale, TSaleItem } from './sale.interface';

const saleItemSchema = new Schema<TSaleItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const saleSchema = new Schema<TSale>(
  {
    items: {
      type: [saleItemSchema],
      required: true,
      validate: {
        validator: (val: TSaleItem[]) => val.length > 0,
        message: 'A sale must have at least one item',
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    soldBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Sale = model<TSale>('Sale', saleSchema);

import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { Sale } from './sale.model';
import { TSaleItem } from './sale.interface';

const createSaleIntoDB = async (
  soldBy: string,
  payload: { items: { product: string; quantity: number }[] },
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const saleItems: TSaleItem[] = [];
    let totalAmount = 0;

    for (const item of payload.items) {
      // Find the product
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product with id ${item.product} not found`,
        );
      }

      // Check stock availability
      if (product.stockQuantity < item.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Insufficient stock for "${product.name}". Available: ${product.stockQuantity}, Requested: ${item.quantity}`,
        );
      }

      const itemTotal = product.sellingPrice * item.quantity;

      saleItems.push({
        product: new mongoose.Types.ObjectId(item.product),
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.sellingPrice,
        totalPrice: itemTotal,
      });

      totalAmount += itemTotal;

      // Reduce stock
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stockQuantity: -item.quantity } },
        { session },
      );
    }

    // Create the sale
    const [sale] = await Sale.create(
      [
        {
          items: saleItems,
          totalAmount,
          soldBy,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return sale;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const getAllSalesFromDB = async () => {
  const result = await Sale.find()
    .populate('items.product')
    .sort({ createdAt: -1 });
  return result;
};

export const SaleServices = {
  createSaleIntoDB,
  getAllSalesFromDB,
};

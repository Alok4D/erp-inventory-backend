import { z } from 'zod';

const saleItemSchema = z.object({
  product: z.string({ message: 'Product ID is required' }),
  quantity: z
    .number({ message: 'Quantity is required' })
    .int()
    .min(1, 'Quantity must be at least 1'),
});

const createSaleValidationSchema = z.object({
  body: z.object({
    items: z
      .array(saleItemSchema)
      .min(1, 'At least one item is required in a sale'),
  }),
});

export const SaleValidation = {
  createSaleValidationSchema,
};

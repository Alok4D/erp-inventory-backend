import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Product name is required',
    }),
    sku: z.string({
      message: 'SKU is required',
    }),
    category: z.string({
      message: 'Category is required',
    }),
    purchasePrice: z.number({
      message: 'Purchase price is required',
    }).min(0, 'Purchase price must be a positive number'),
    sellingPrice: z.number({
      message: 'Selling price is required',
    }).min(0, 'Selling price must be a positive number'),
    stockQuantity: z.number().min(0, 'Stock cannot be negative').optional(),
    imageUrl: z.string({
      message: 'Image URL is required',
    }),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
};

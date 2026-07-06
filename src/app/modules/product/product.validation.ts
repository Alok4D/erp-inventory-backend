import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name is required',
    }),
    sku: z.string({
      required_error: 'SKU is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    purchasePrice: z.number({
      required_error: 'Purchase price is required',
    }).min(0, 'Purchase price must be a positive number'),
    sellingPrice: z.number({
      required_error: 'Selling price is required',
    }).min(0, 'Selling price must be a positive number'),
    stockQuantity: z.number().min(0, 'Stock cannot be negative').optional(),
    imageUrl: z.string({
      required_error: 'Image URL is required',
    }),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
};

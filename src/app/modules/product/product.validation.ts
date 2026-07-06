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

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    purchasePrice: z.number().min(0, 'Purchase price must be a positive number').optional(),
    sellingPrice: z.number().min(0, 'Selling price must be a positive number').optional(),
    stockQuantity: z.number().min(0, 'Stock cannot be negative').optional(),
    imageUrl: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};

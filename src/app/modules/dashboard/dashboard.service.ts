import { Product } from '../product/product.model';
import { Sale } from '../sale/sale.model';

const getDashboardSummary = async () => {
  // Total products count
  const totalProducts = await Product.countDocuments();

  // Low stock items (threshold: < 5)
  const lowStockProducts = await Product.find({ stockQuantity: { $lt: 5 } }).sort({ stockQuantity: 1 });

  // Total sales count & amount
  const sales = await Sale.find();
  const totalSalesCount = sales.length;
  const totalSalesAmount = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

  return {
    totalProducts,
    totalSalesCount,
    totalSalesAmount,
    lowStockProducts,
  };
};

export const DashboardServices = {
  getDashboardSummary,
};

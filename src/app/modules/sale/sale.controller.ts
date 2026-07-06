import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { SaleServices } from './sale.service';

const createSale = catchAsync(async (req, res) => {
  // req.user.userId holds the user's email (set during JWT creation)
  const soldBy = req.user.userId;
  const result = await SaleServices.createSaleIntoDB(soldBy, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale is created successfully',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SaleServices.getAllSalesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales are retrieved successfully',
    data: result,
  });
});

export const SaleControllers = {
  createSale,
  getAllSales,
};

import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { SaleServices } from './sale.service';

const createSale = catchAsync(async (req, res) => {
  // req.user.userId holds the user's email (set during JWT creation)
  const soldBy = req.user.userId;
  const result = await SaleServices.createSaleIntoDB(soldBy, req.body);

  // Broadcast new sale via socket.io
  const io = req.app.get('io');
  if (io) {
    io.emit('new_sale', { message: 'A new sale has been created!', data: result });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale is created successfully',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SaleServices.getAllSalesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const deleteSale = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SaleServices.deleteSaleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale is deleted successfully',
    data: result,
  });
});

export const SaleControllers = {
  createSale,
  getAllSales,
  deleteSale,
};

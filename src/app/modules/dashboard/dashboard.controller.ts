import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { DashboardServices } from './dashboard.service';

const getDashboardSummary = catchAsync(async (req, res) => {
  const result = await DashboardServices.getDashboardSummary();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard summary retrieved successfully',
    data: result,
  });
});

export const DashboardControllers = {
  getDashboardSummary,
};

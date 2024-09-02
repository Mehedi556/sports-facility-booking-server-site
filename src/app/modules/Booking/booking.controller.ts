import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import noDataFoundResponse from '../../utils/noDataFoundResponse';

// controller for create booking
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

// controller for get all bookings for admin
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req?.query);

  if(result?.result?.length < 1){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result
    })
  } else{
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
}
});

// controller for get all bookings for user
const getAllBookingsForUser = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsForUserFromDB(req);

  if(result.length < 1){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result
    })
  } else{
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
}
});

// controller for checking availability
const checkAvailability = catchAsync(async (req, res) => {
  const result = await BookingServices.checkingAvailabilityFromDB(req);

  if(result.length == 0){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Slots Found",
      data: result
    })
  } else{
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
}
});

// controller for cancel booking
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBookingFromDB(id);

  if(!result){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result
    })
  } else{
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
}
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    checkAvailability,
    getAllBookingsForUser,
    deleteBooking,
};
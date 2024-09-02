import { Booking } from "../Booking/booking.model"

const confirmationService = async (transactionId:string) => {
    const result = await Booking.findOneAndUpdate({ transactionId }, {
        paymentStatus: 'Paid'
    }).populate('facility').populate('user')
    return result;
}

export const paymentServices = {
    confirmationService
}
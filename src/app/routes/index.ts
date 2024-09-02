import { Router } from "express";
import { FacilityRoutes } from "../modules/Facility/facility.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { paymentRoutes } from "../modules/payment/payment.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/facility',
        route: FacilityRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/',
        route: BookingRoutes
    },
    {
        path: '/payment',
        route: paymentRoutes
    },
]

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
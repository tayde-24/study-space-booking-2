import express from 'express';
import prisma from '../utils/prisma.js';
import bookingRoutes from './bookingRoutes.js';
import buildingRoutes from './buildingRoutes.js';
import roomRoutes from './roomRoutes.js';
import authRoutes from './authRoutes.js';
import adminRoomRoutes from './admin/adminRooms.js';
import adminBookingRoutes from './admin/adminBooking.js';
import adminBuildingRoutes from './admin/adminBuildings.js';

const router = express.Router();

//Change this code
// router.use('/', require('./...'));
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/buildings', buildingRoutes);
router.use('/admin/rooms', adminRoomRoutes);
router.use('/admin/bookings', adminBookingRoutes);
router.use('/admin/buildings', adminBuildingRoutes);

// router.get('/auth', authRoutes);

export default router;
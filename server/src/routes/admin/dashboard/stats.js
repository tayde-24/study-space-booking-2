import express from "express";
// import { requireAdmin } from "../../admin/middleware/auth.js";
// import prisma from "../../admin/utils/prisma.js";
import { requireAdmin } from "../../../middleware/auth.js";
import prisma from "../../../utils/prisma.js";

const router = express.Router();

router.get("/stats", requireAdmin, async (req, res) => {
    try {
        const [
            buildings,
            rooms,
            bookings,
            users,
            recentBookings
        ] = await Promise.all([
            prisma.building.count(),
            prisma.room.count(),
            prisma.booking.count(),
            prisma.user.count(),
            prisma.booking.findMany({
                take: 5,
                orderBy: {
                    startTime: "desc"
                },
                include: {
                    user: true,
                    room: { include: { building: true } }
                }
            })
        ]);
        res.json({
            buildings,
            rooms,
            bookings,
            users,
            recentBookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
})

export default router;
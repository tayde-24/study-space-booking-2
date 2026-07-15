import express from "express";
//import passport from "passport";
import {requireAdmin} from "../../middleware/auth.js";
import prisma from "../../utils/prisma.js";

const router = express.Router();

router.get("/", requireAdmin, async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
        include: {
            user: true,
            room:{ include: {
                building: true
            }
        }
    },
    orderBy: {
        startTime: "asc"
    }
    }
    );

    res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
    
})

router.delete("/:id", requireAdmin, async (req, res) => {

    try{
    //     await prisma.booking.delete({
    //     where: { id: Number(req.params.id)}
    // })
    const bookingId = Number(req.params.id);

        await prisma.booking.delete({
            where: {
                id: bookingId,
            },
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete booking" });
    }
    
})

export default router;
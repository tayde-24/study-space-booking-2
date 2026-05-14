import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {
            userId,
            roomId,
            startTime,
            endTime
        } = req.body

        const conflict = await prisma.booking.findFirst({
            where: {
                roomId: roomId,
                AND: [
                    {
                        startTime: {
                            lt: new Date(endTime)
                        }
                    },
                    {
                        endTime: {
                            gt: new Date(startTime)
                        }
                    }
                ]
            }
        })

        if (conflict) {
            return res.status(400).json({
                error: "Time slot is already booked"
            })
        }

        const booking = await prisma.booking.create({
            data: {
                userId,
                roomId,
                startTime: new Date(startTime),
                endTime: new Date(endTime)
            }
        })

        res.status(201).json(booking);

    } catch (error) {
        console.log(error);
        console.error(error);

        res.status(500).json({ 
            error: error.message 
        })
    }
});

export default router;
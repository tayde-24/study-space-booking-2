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
            return res.status(409).json({
                error: "Time slot is already booked"
            })
        }

        // Validate dates
        const start = new Date(startTime)
        const end = new Date(endTime)
        if (
            isNaN(start.getTime()) ||
            isNaN(end.getTime())
        ) {
            return res.status(400).json({
                error: "Invalid date format"
            })
        }

        // Prevents backwards bookings
        if (startTime >= endTime) {
            return res.status(400).json({
                error: "Start time must be before end time"
            })
        }

        // Creates the booking
        const booking = await prisma.booking.create({
            data: {
                userId: req.user.id,
                roomId: Number(roomId),
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

router.get('/', async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

// router.get('/me', async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }

//         const bookings = await prisma.booking.findMany({
//             where: {
//                 userId: req.user.id
//             },
//             orderBy: {
//                 startTime: 'asc'
//             }
//         });
//         res.json(bookings);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to fetch user bookings" });
//     } 
// });
router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  prisma.booking.findMany({
    where: {
      userId: req.user.id
    },
    include: {
      room: true
    },
    orderBy: {
      startTime: 'asc'
    },
  })
  .then(bookings => res.json(bookings))
  .catch(err => {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch user bookings" })
  })
  console.log("req.user:", req.user)
});

export default router;
import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

// router.get('/', async (req, res) => {
//     const rooms = await prisma.room.findMany();
//     res.json(rooms);
// })
// GET all rooms
router.get("/", async (req, res) => {
  try {
    const buildingId = req.query.buildingId;
    const where = buildingId ? { buildingId: Number(buildingId) } : {};

    const rooms = await prisma.room.findMany({
      orderBy: {
        name: "asc"
      },
      where
    })

    res.json(rooms)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: "Server error"
    })
  }
});

router.get('/availability', async (req, res) => {
    try {

      const startTime = new Date(req.query.startTime);
      const endTime = new Date(req.query.endTime);

      const rooms = await prisma.room.findMany({
        include: {
          bookings: true,
          building: true
        }
      })

      // const now = new Date();
      // const roomStatuses = rooms.map(room => {
      //   const occupied = room.bookings.some(booking => {
      //     return (
      //       now >= new Date(booking.startTime) &&
      //       now <= new Date(booking.endTime)
      //     )
      //   })
      const results = rooms.map(room => {
        const unavailable = room.bookings.some(
          booking =>
            startTime < booking.endTime && 
            endTime > booking.startTime
        );

        return {
          id: room.id,
          name: room.name,
          building: room.building.name,
          available: !unavailable
        }
      })

      // res.json(roomStatuses)
      res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch room availability" });
    }
});


export default router;
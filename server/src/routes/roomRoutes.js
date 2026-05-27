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
    const rooms = await prisma.room.findMany({
      orderBy: {
        name: "asc"
      }
    })

    res.json(rooms)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: "Server error"
    })
  }
})

export default router;
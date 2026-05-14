import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
})

export default router;
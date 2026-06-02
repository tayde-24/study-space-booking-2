import express from "express";
// import { PrismaClient } from "../generated/prisma/client.mts";
import prisma from "../utils/prisma.js";

const router = express.Router();

// GET all buildings
router.get('/', async(req, res) => {
    try {
        const buildings = await prisma.building.findMany({
            include: {
                rooms: true
            }
        })
        res.json(buildings)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
})

export default router;
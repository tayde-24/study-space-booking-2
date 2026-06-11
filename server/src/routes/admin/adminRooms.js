import express from "express";
import passport from "passport";
import { requireAdmin } from "../../middleware/auth.js";
import prisma from "../../utils/prisma.js";

const router = express.Router();

router.get("/", requireAdmin, async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({
            include: {
                building: true
            }
        });

        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});

router.post("/", requireAdmin, async (req, res) => {
    console.log(req.body);
    const { name, capacity, buildingId } = req.body;
    try{
        const room = await prisma.room.create({
        data: {
            name,
            capacity: Number(capacity),
            buildingId: Number(buildingId)
        }
    })
    res.json(room);
    } catch (err) {
        cosole.error(err);
        res.status(500).json({ error: "Failed to create room" });
    }
})

router.put("/:id", requireAdmin, async (req, res) => {
    const { name, capacity, buildingId } = req.body;
    try{
        const room = await prisma.room.update({
        where: { id: Number(req.params.id) },
        data: {
            name,
            capacity: Number(capacity),
            buildingId: Number(buildingId)
        }
    })
    res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update room" });
    }
})

router.delete("/:id", requireAdmin, async (res, req) => {
    try {
    await prisma.room.delete({
        where: {id: Number(req.params.id)}
    })

    res.json({ success: true });
    return res.message("Room deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete room" });
    }
})

export default router;
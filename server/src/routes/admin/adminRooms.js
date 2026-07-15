import express from "express";
import { requireAdmin } from "../../middleware/auth.js";
import prisma from "../../utils/prisma.js";

const router = express.Router();

router.get("/", requireAdmin, async (req, res) => {
    try {
        const { buildingId } = req.query;

        const where = buildingId
            ? { buildingId: Number(buildingId) }
            : {};

        const rooms = await prisma.room.findMany({
            where,
            include: {
                building: true
            },
            orderBy: {
                name: "asc"
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
    const { name, capacity, buildingId, description, amenities } = req.body;
    try{
        const room = await prisma.room.create({
        data: {
            name,
            imageUrl: req.body.imageUrl || "/rooms/placeholder_room.png",
            capacity: Number(capacity),
            buildingId: Number(buildingId),
            capacity: Number(capacity),
            description,
            amenities,
            
        }
    })
    res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create room" });
    }
})

router.put("/:id", requireAdmin, async (req, res) => {
    const { name, imagesUrl, capacity, buildingId, description, amenities, } = req.body;
    try{
        const room = await prisma.room.update({
        where: { id: Number(req.params.id) },
        data: {
            name,
            imageUrl: req.body.imageUrl || "/rooms/placeholder_room.png",
            capacity: Number(capacity),
            buildingId: Number(buildingId),
            description,
            amenities
        }
    })
    res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update room" });
    }
})

router.delete("/:id", requireAdmin, async (req, res) => {
    try {
    await prisma.room.delete({
        where: {id: Number(req.params.id)}
    });;

    res.json({ success: true,
        message: "Room deleted successfully" });
    // return res.message("Room deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete room" });
    }
})

export default router;
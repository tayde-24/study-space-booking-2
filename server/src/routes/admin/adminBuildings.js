import express from "express";
import passport from "passport";
import { requireAdmin } from "../../middleware/auth.js";
import prisma from "../../utils/prisma.js";

const router = express.Router();

router.get("/", requireAdmin, async (req, res) => {
    try {
        const buildings = await prisma.building.findMany({
            include: {
                rooms: true
            }
            }
        );
        res.json(buildings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch buildings" });
    }
});

router.post("/", requireAdmin, async (req, res) => {
    try{
        const {name, imageUrl, location, description} = req.body;
        const building = await prisma.building.create({
        data: {
            name,
            imageUrl: imageUrl || "/buildings/placeholder_building.png",
            location: location || null,
            description: description || null
        }
    });

    res.json(building);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create building" });
    }
    
});

router.put("/:id", requireAdmin, async (req, res) => {
    try{
        const { name, imageUrl, location, description } = req.body;
        const building = await prisma.building.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                imageUrl: imageUrl || "/buildings/placeholder_building.png",
                location: location || null,
                description: description || null
            }
        });
        res.json(building);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update building" });
    }
});

router.delete("/:id", requireAdmin, async (req, res) => {

    try {
        const buildingId = Number(req.params.id);
    await prisma.$transaction([
        prisma.booking.deleteMany({
            where: {
                room: {
                    buildingId: buildingId
                }
            }
    }),

    prisma.room.deleteMany({
        where: {
            buildingId: buildingId
        }
    }),

    prisma.building.delete({
        where: { id: buildingId }
    })])
    
    res.json({ success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete booking" });
    }

})

export default router;

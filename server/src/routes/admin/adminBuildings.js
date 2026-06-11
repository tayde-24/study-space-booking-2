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
        const {name} = req.body;
        const building = await prisma.building.create({
        data: {name}
    });

    res.json(building);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create building" });
    }
    
});

router.delete("/:id", requireAdmin, async (req, res) => {

    try {
        await prisma.building.delete({
        where: { id: Number(req.params.id)}
    })

    res.json({ success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete building" });
    }

})

export default router;

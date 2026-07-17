import express from "express";
import { requireAdmin } from "../../middleware/auth.js";
import prisma from "../../utils/prisma.js";

const router = express.Router();

// GET all users
router.get("/", requireAdmin, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                name: "asc"
            },
            include: {
                bookings: {
                    include: {
                        room: {
                            include: {
                                building: true 
                            }
                        }
                    }   
                }
            }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.put("/:id", requireAdmin, async (req, res) => {
    
    
    try {
        const id = Number(req.params.id);
        const {role} = req.body;

        console.log("Logged in user:", req.user);
        console.log("Editing user:", id);
        console.log("New role:", role);

        if (req.user.id === id && role !== "ADMIN") {
        return res.status(403).json({ 
            error: "You cannot remove your own admin privileges" 
        });
        
      }

        const updatedUser = await prisma.user.update({
            where: { 
                id 
            },
            data: {
                role
            }
        });
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

router.delete("/:id", requireAdmin, async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (req.user.id === id) {
            return res.status(403).json({ 
                error: "You cannot delete your own account" 
            });
        }

        await prisma.user.delete({
            where: { 
                id
            }
        });
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user" });
    }

});

export default router;
export const requireAdmin = (req, res, next) => {
    // const user = req.user;

    // if (!user || user.role !== "ADMIN") {
    //     return res.status(403).json({ error: "Admin only"})
    // }
    
    // if(!req.user) {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    // next();
    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            error: "Admin only"
        });
    }

    console.log("Admin:", req.user.email);

    next();
}
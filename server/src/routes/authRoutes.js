import express from "express";
import passport from "passport";

const router = express.Router();

router.get (
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/login',
        // successRedirect: '/'
    }),

    (req, res) => {
        res.redirect('http://localhost:3000/dashboard');
    }
)

router.get('/me', (req, res) => {
    
    res.json({ user: req.user || null });
})

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
});

export default router;
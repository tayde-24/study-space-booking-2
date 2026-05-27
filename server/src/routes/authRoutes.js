import express from "express";
import passport from "passport";

const router = express.Router();

router.get (
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
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
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
    });

    //This code below destroys cookie and session.

    // req.session.destroy(() => {
    //     res.clearCookie('connect.sid');
    //     res.json({ message: 'Logged out successfully' });
    // });
});

export default router;
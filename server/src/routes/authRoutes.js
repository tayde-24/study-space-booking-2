import express from "express";
import passport from "passport";
import prisma from "../utils/prisma.js";

const router = express.Router();

// export const googleCallbackController = async (req, res) => {
//   try {
//     const profile = req.user;

//     const email = profile.emails?.[0]?.value;
//     if (!email) {
//       return res.redirect("http://localhost:3000/login");
//     }

//     const user = await prisma.user.upsert({
//       where: { email },
//       update: { name: profile.displayName },
//       create: {
//         email,
//         name: profile.displayName,
//         role: "USER",
//       },
//     });

//     await prisma.user.update({
//         where: { email: "taydeluevano@gmail.com"},
//         data: { role: "ADMIN" }
//     })
//     ,
//     req.session.user = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     return res.redirect("http://localhost:3000/dashboard");
//   } catch (err) {
//     console.error(err);
//     return res.redirect("http://localhost:3000/login");
//   }
// };
console.log('Google callback called');
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
    async (req, res) => {
        if (req.user.role === "ADMIN") {
            console.log('Admin user logged in');
            return res.redirect('http://localhost:3000/admin');
        }
        res.redirect('http://localhost:3000/dashboard');
    }

    //googleCallbackController
    // , async (req, res) => {
    //     const profile = req.user

    //     const user = await prisma.user.upsert({
    //         where: {
    //             email: profile.emails[0].value
    //         },
    //         update: {
    //             name: profile.displayName
    //         },
    //         create: {
    //             email: profile.emails[0].value,
    //             name: profile.displayName,
    //             role: "USER"
    //         }
    //     })
    // },

    // await prisma.user.update({
    //     where: { email: "taydeluevano@gmail.com"},
    //     data: { role: "ADMIN" }
    // })
    // ,

    // (req, res) => {

    //     req.session.user = {
    //         id: user.id,
    //         email: user.email,
    //         role: user.role
    //     }
    //     res.redirect('http://localhost:3000/dashboard');
    // }
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
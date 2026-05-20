import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './auth/passport.js';
import authRoutes from './routes/authRoutes.js';
import indexPage from './routes/index.js';


dotenv.config();

const app = express();

app
    .use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    .use(express.json())
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        cookie: {
            secure: false, // Set to true if using HTTPS
            httpOnly: true,
            sameSite: 'lax',
        },
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use('/auth', authRoutes)
    .use('/', indexPage);
app.get("/", (req, res) => {
    res.json({message: "API is running"})
});

app.get("/test-session", (req, res) => {
  res.json({
    user: req.user,
    session: req.session
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
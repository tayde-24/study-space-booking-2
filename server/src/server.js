import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexPage from './routes/index.js';


dotenv.config();

const app = express();

app
    .use(cors())
    .use(express.json())
    .use('/', indexPage);
app.get("/", (req, res) => {
    res.json({message: "API is running"})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
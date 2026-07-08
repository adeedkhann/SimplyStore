import express from "express";
import helmet from "helmet";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";

configDotenv();

const app = express();
connectDB();

app.use(helmet());

app.use(cors({
    // origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send(" E-commerce API is up and running!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
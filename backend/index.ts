import express, { Express, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/db';

const PORT          = process.env.PORT || 3333;
const FRONTEND_URL  = process.env.FRONTEND_URL || 'http://localhost:3000';

const app:Express = express();
const router = Router();

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

/*+++
Register a new user
---*/
app.post("/api/register", async (req, res) => {});

/*+++
Login / Authenticate a user
---*/
app.post("/api/get-user", async (req, res) => {});

/*+++
Update user details
---*/
app.post("/api/set-user", async (req, res) => {});

/*+++
Buy an item
---*/
app.post("/api/buy", async (req, res) => {});

/*+++
Fetch all cars
---*/
app.post("/api/all-cars", async (req, res) => {});

/*+++
Fetch all alcohol
---*/
app.post("/api/all-alcohol", async (req, res) => {});

/*+++
Get a specific alcohol
---*/
app.post("/api/alcohol/:id", async (req, res) => {});

/*+++
Get a specific car
---*/
app.post("/api/cars/:id", async (req, res) => {
    try {
        const { id } = req.params;
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

/*+++
Create a new car review
---*/
app.post("/api/create-car-review", async (req, res) => {});

/*+++
Create a new car
---*/
app.post("/api/create-car", async (req, res) => {});

/*+++
Create a new alcohol review
---*/
app.post("/api/create-alcohol-review", async (req, res) => {});

/*+++
Create a new alcohol
---*/
app.post("/api/create-alcohol", async (req, res) => {});

/*+++
Test database connection
---*/
app.get("/api/ping", async (req, res) => {
    try{
        const [rows] = await sequelize.query('SELECT 1 + 1 AS result');
        res.status(200).json({ message: 'Pong!', result: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

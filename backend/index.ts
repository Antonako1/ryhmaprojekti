import express, { Express, Router } from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/db';
import Register from './src/endpoint/Register';
import GetUser from './src/endpoint/GetUser';
import User from './src/modules/User';
import SetUser from './src/endpoint/SetUser';

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
app.post("/api/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, balance } = req.body;
        await Register(firstName, lastName, email, password, role, balance);
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error : any) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
});

/*+++
Login / Authenticate a user and create a session
---*/
app.post("/api/get-user", async (req, res) => {
    try {
        res = await GetUser(req, res);
    } catch (error: any) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
});

/*+++
Update user details (email, password, role, balance), etc. Requires authentication
---*/
app.post("/api/set-user", async (req, res) => {
    try {
        res = await SetUser(req, res);
    } catch (error : any) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
});

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

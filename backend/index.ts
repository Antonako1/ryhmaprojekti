import express, { Express, Router } from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/db';
import Register from './src/endpoint/Register';
import GetUser from './src/endpoint/GetUser';
import User, { RollChances, UserRoles } from './src/modules/User';
import SetUser from './src/endpoint/SetUser';
import AllCars from './src/endpoint/AllCars';
import AllAlcohol from './src/endpoint/AllAlcohol';
import AlcoholId from './src/endpoint/AlcoholId';
import CarId from './src/endpoint/CarId';
import GetAmountCar from './src/endpoint/GetAmountCar';
import GetAmountAlc from './src/endpoint/GetAmountAlc';
import Product from './src/modules/Product';
import CartWishlist from './src/modules/CartWishlist';
import Review from './src/modules/Review';
import CarDetails from './src/modules/CarDetails';
import AlcoholDetails from './src/modules/AlcoholDetails';
import CreateCar from './src/endpoint/CreateCar';
import CreateAlcohol from './src/endpoint/CreateAlcohol';
import bcrypt from 'bcrypt';
import VerifyToken from './src/endpoint/VerifyToken';
import UpdateOwnUser from './src/endpoint/UpdateOwnUser';
import PostReview from './src/endpoint/PostReview';
import GetReview from './src/endpoint/GetReview';
import PostCart from './src/endpoint/PostCart';
import GetCartWishlist from './src/endpoint/GetCartWishlist';
import GetProduct from './src/endpoint/GetProduct';
import Buy from './src/endpoint/Buy';
import Deposit from './src/endpoint/Deposit';
import RemoveCartWishlist from './src/endpoint/RemoveCartWishlist';

dotenv.config();
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
        res = await Register(req, res);
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
app.post("/api/buy", async (req, res) => {
    try {
        res = await Buy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

/*+++
Fetch all cars
---*/
app.get("/api/all-cars", async (req, res) => {
    try {
        res = await AllCars(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

/*+++
Fetch all alcohol
---*/
app.get("/api/all-alcohol", async (req, res) => {
    try {
        res = await AllAlcohol(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

/*+++
Get a specific alcohol
---*/
app.get("/api/alcohol/:id", async (req, res) => {
    try {
        res = await AlcoholId(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

/*+++
Get a specific car
---*/
app.get("/api/cars/:id", async (req, res) => {
    try {
        res = await CarId(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

/*+++
Create a new car
---*/
app.post("/api/create-car", async (req, res) => {
    try {
        res = await CreateCar(req, res);
    } catch (error:any) {
        console.error(error)
        res.status(500).send("Internal server error: " + error.message)
    }
});

/*+++
Create a new alcohol
---*/
app.post("/api/create-alcohol", async (req, res) => {
    try {
        res = await CreateAlcohol(req, res);
    } catch (error:any) {
        console.error(error)
        res.status(500).send("Internal server error: " + error.message)
    }
});

/*+++
Get amount of reviews and cars
---*/
app.get("/api/get-amount/car", async (req, res) => {
    try {
        res = await GetAmountCar(req, res);   
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

/*+++
Get amount of reviews and alcohol
---*/
app.get("/api/get-amount/alcohol", async (req, res) => {
    try {
        res = await GetAmountAlc(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
});

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

app.get("/api/verify-token", async (req, res) => {
    try {
        res = await VerifyToken(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/api/post/review", async(req, res) =>{
    try{
        res = await PostReview(req, res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/api/create-review", async(req, res) =>{
    try{
        res = await PostReview(req, res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/api/get-reviews", async (req, res) => {
    try{
        res = await GetReview(req, res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }  
})

app.get("/api/get-cartwishlist", async (req, res) => {
    try{
        res = await GetCartWishlist(req, res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }  
})

app.post("/api/create-cart", async(req, res) => {
    try {
        res = await PostCart(req, res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.get("/api/get-product", async(req, res) => {
    try {
        res = await GetProduct(req, res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error")
    }
})

app.post("/api/deposit", async (req, res) => {
    try {
        res = await Deposit(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/api/remove-cart-wishlist", async (req, res) => {
    try {
        res = await RemoveCartWishlist(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, async () => {
    try {
        await sequelize.sync(
            { 
                alter: true,
                // force: true,
            }
        );
    } catch (error) {
        console.error("Error syncing database:", error);
    }
    try {
        
        const admin = await User.findOne({ where: { email: "admin" } });
        const streamer = await User.findOne({ where: { email: "streamer" } });
        if (!admin) {
            await User.create({
                email: "admin",
                firstName: "Admin",
                lastName: "Admin",
                role: UserRoles.ADMIN,
                balance: 10000000,
                passwordHash: await bcrypt.hash("admin", 10),
                casinoRollChance: RollChances.Admin,
            });
        } else {
            // Update casinoRollChance
            admin.casinoRollChance = RollChances.Admin;
            await admin.save();
            console.log("Admin user already exists. Updated casinoRollChance to Admin value.");
        }
        if(!streamer){
            await User.create({
                email: "streamer",
                firstName: "Streamer",
                lastName: "Streamer",
                role: UserRoles.USER,
                balance: 10000000,
                passwordHash: await bcrypt.hash("streamer", 10),
                casinoRollChance: RollChances.Streamer,
            });
        } else {
            // Update casinoRollChance
            streamer.casinoRollChance = RollChances.Streamer;
            await streamer.save();
            console.log("Streamer user already exists. Updated casinoRollChance to Streamer value.");
        }
        console.log("Admin user created. email: admin, password: admin");
        console.log(`Server is running on port ${PORT}`);
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Error listening to port:", error);
    }
    app.post('/api/update-user', UpdateOwnUser);
});

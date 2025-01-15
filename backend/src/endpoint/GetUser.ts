import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import User from '../modules/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const GetUser = async (
    req: any,
    res: any
) : Promise<any> => {
    try {
        // Get email & password from request body
        const { email, password } = req.body;

        // Find user in the database
        const user = await User.findOne({
            where: { email: email }
        });

        // Check if user exists
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if password is correct
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            return res.status(401).send('Incorrect password provided');
        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).send('Internal Server Error: JWT not configured');
        }
        
        const token = jwt.sign({ email: user.email, role: user.role }, secret, { expiresIn: '24h' });

        // Return user details and token
        return res.status(200).json({
            message: 'User authenticated successfully, returning details',
            user: user,
            token: token
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error.message);
    }
};

export default GetUser;
    
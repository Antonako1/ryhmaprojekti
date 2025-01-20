import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import User from '../modules/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const Deposit = async (req: any, res: any): Promise<any> => {
    const { deposit } = req.body;

    // Extract the token from the request headers
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    
    try {
        const secret: string = process.env.JWT_SECRET || '';
        if(!secret) {
            return res.status(500).json({ message: 'Internal Server Error: JWT secret missing' });
        }
        // Verify the token
        const decoded: any = jwt.verify(token, secret);
        !decoded ? res.status(401).json({ message: 'Unauthorized: Invalid token' }) : null;
        
        // Find user in the database
        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user balance
        user.balance += deposit;
        await user.save();

        return res.status(200).json({ message: 'Deposit successful', balance: user.balance });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error.message);
    }

}

export default Deposit;
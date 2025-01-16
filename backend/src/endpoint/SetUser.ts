import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import User from '../modules/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRoles } from "../modules/Interfaces";

dotenv.config();
const SetUser = async (req: any, res: any): Promise<any> => {
    const { email, password, role, balance, firstName, lastName } = req.body;

    // Extract the token from the request headers
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer <token>"

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
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.email !== decoded.email) {
            decoded.role !== UserRoles.Admin ? res.status(401).json({ message: 'Unauthorized: Insufficient role' }) : null;
        }
        // Check if password needs to be updated
        if (password && !(await bcrypt.compare(password, user.passwordHash))) {
            user.passwordHash = await bcrypt.hash(password, 10);
        }

        // Update user details
        user.role = role;
        user.balance = balance;
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();

        return res.status(200).json({ message: 'User details updated successfully' });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error.message);
    }
};

export default SetUser;

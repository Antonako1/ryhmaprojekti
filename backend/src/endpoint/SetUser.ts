import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import User from '../modules/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SetUser = async (req: any, res: any) : Promise<any> => {
    const { token, email, password, role, balance, firstName, lastName } = req.body;
    try {
        // Verify session
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const secret: string = process.env.JWT_SECRET || '';
        jwt.verify(token, secret, async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        });

        // Update user details
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if password needs to be updated
        if(!await bcrypt.compare(password, user.passwordHash)) {
            user.passwordHash = await bcrypt.hash(password, 10);
        }

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
}

export default SetUser;
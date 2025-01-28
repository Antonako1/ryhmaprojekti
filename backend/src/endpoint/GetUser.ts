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
        console.log(req.body, email);
        // Find user in the database
        const user = await User.findOne({
            where: { email: email }
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // JWT provided, verify it
        const token_in = req.headers['authorization']?.split(' ')[1];
        const secret: string = process.env.JWT_SECRET || '';

        if (token_in) {
            // Verify the token
            try {
                const decoded: any = jwt.verify(token_in, secret);
                if (decoded.email !== email) {
                    return res.status(401).json({ message: 'Token email does not match user email' });
                }
                
                // If token is valid, return user info
                return res.status(200).json({
                    message: 'User authenticated successfully with JWT',
                    user: user,
                    token: token_in
                });
            } catch (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
        } else {
            // No token provided, verify password
            const match = await bcrypt.compare(password, user.passwordHash);
            if (!match) {
                return res.status(401).json({ message: 'Incorrect password provided' });
            }

            // If password is correct, generate new JWT token
            if (!secret) {
                return res.status(500).json({ message: 'Internal Server Error: JWT not configured' });
            }

            const token = jwt.sign({ email: user.email, role: user.role, id: user.id }, secret, { expiresIn: '24h' });

            // Return user details and token
            return res.status(200).json({
                message: 'User authenticated successfully, returning details',
                user: user,
                token: token
            });
        }

    } catch (error: any) {
        console.error(error);
        return res.status(500).message({ message : "Internal Server Error: " + error.message});
    }
};

export default GetUser;

import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import User from '../modules/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



const GetUser = async (
    Request: any,
    Response: any
) : Promise<any> => {
    try {
        // get email & password
    const { email, password } = Request.body;

    // Find user in database
    const user:User|null = await User.findOne({
        where: { email: email }
    });

    // Check if user exists
    if(!user) {
        throw new Error('User not found');
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) {
        throw new Error('Incorrect password provided');
    }

    // Return user details
    const res_:User = await GetUser(email, password);

    // Generate JWT token
    const secret: jwt.PrivateKey = process.env.JWT_SECRET || '';
    if(secret === '') {
        throw new Error('JWT_SECRET not set in .env file');
    }
    const token = jwt.sign({ email: res_.email }, secret, { expiresIn: '1h' });

    // Return user details
    return Response.status(200).json(
        { message: 
            'User authenticated successfully, returning details', 
            user: res_,
            token: token
        });   
    } catch (error : any) {
        console.error(error);
        return Response.status(500).send("Internal Server Error: " + error.message);
    }
}

export default GetUser;
    
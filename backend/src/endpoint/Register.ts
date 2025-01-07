import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import User from '../modules/User';
import { create } from 'ts-node';
import CartWishlist from '../modules/CartWishlist';

const Register = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    role: string, 
    balance: number
) => {
    try {
        await sequelize.sync();
        await User.sync();
        await CartWishlist.sync();
        const user = await User.findOne({ where: { email } });
        if (user) {
            throw new Error("User already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const cartWishlist =
        await CartWishlist.create({
            userId: 1,
            productId: 1,
            quantity: 1,
            createdAt: new Date(),
            updatedAt: new Date
        });

        const newUser =
        await User.create({
            firstName,
            lastName,
            email,
            passwordHash,
            role,
            balance,
            createdAt: new Date(),
            updatedAt: new Date(),
            CartWishlistId: 1
        });

        // Assign the cartWishlistId to the user
        newUser.cartWishlistId = cartWishlist.id;
        await newUser.save();

        // Assign the userId to the cartWishlist
        cartWishlist.userId = newUser.id;
        await cartWishlist.save();
    } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export default Register;
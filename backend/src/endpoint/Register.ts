import bcrypt from "bcrypt";
import sequelize from "../config/db";
import User from "../modules/User";
import CartWishlist from "../modules/CartWishlist";

const Register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    balance: number
) => {
    const transaction = await sequelize.transaction(); // Start a transaction

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new CartWishlist entry for the user
        const newCartWishlist = await CartWishlist.create(
            {},
            { transaction } // Pass the transaction
        );

        // Create a new User entry
        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                password: passwordHash, // Store the hashed password
                role,
                balance,
                CartWishlistId: newCartWishlist.id, // Link the user's CartWishlist
            },
            { transaction } // Pass the transaction
        );

        // Commit the transaction
        await transaction.commit();

        return {
            message: "User registered successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                balance: newUser.balance,
            },
        };
    } catch (error: any) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error("Error in Register function:", error.message);
        throw new Error(error.message || "Internal Server Error");
    }
};

export default Register;

import bcrypt from "bcrypt";
import sequelize from "../config/db";
import User from "../modules/User";
import CartWishlist from "../modules/CartWishlist";

const Register = async (
    req:any,
    res:any
) :Promise<any> =>  {
    const { firstName, lastName, email, password, role, balance } = req.body;

    const transaction = await sequelize.transaction(); // Start a transaction

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log("Password Hash:", passwordHash);
        // Create a new User entry
        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                passwordHash, // Store the hashed password
                role,
                balance,
            },
            { transaction } // Pass the transaction
        );

        // Commit the transaction
        await transaction.commit();


        return res.status(200).json(
        {
            message: "User registered successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                balance: newUser.balance,
            },})
    } catch (error: any) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error("Error in Register function:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

export default Register;

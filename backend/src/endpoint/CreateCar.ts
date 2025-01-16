import sequelize from "../config/db";
import CarDetails from "../modules/CarDetails";
import Product from "../modules/Product";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRoles } from "../modules/Interfaces";

dotenv.config();
// Create a new car entry
const CreateCar = async (req: any, res: any): Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token, req.headers);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const secret: string = process.env.JWT_SECRET || '';
    if(!secret) {
        return res.status(500).json({ message: 'Internal Server Error: JWT secret missing' });
    }
    // Verify the token
    const decoded: any = jwt.verify(token, secret);
    !decoded ? res.status(401).json({ message: 'Unauthorized: Invalid token' }) : null;
    decoded.role !== UserRoles.Admin ? res.status(401).json({ message: 'Unauthorized: Insufficient role' }) : null;
            
    const transaction = await sequelize.transaction();
            
    try {
        const { name
            , price
            , stock
            , image
            , description
            , carMake
            , carModel
            , carYear
            , carMileage
        } = req.body;
         
        const product = await Product.create(
            {
                name: name,
                price: price,
                stock: stock,
                image: image,
                description: description,
            },
            { transaction }
        );

        const car = await CarDetails.create(
            {
                carMake: carMake,
                carModel: carModel,
                carYear: carYear,
                carMileage: carMileage,
                product_id: product.product_id, // Set the foreign key to the Product entry
            },
            { transaction } // Pass the transaction
        );
        // Commit the transaction
        await transaction.commit();

        res.status(201).json({
            message: "Car created successfully",
            product,
            car,
        });
    } catch (error: any) {
        await transaction.rollback(); // Rollback the transaction in case of an error
        console.error("Error creating car:", error.message);
        res.status(500).send("Internal Server Error: " + error.message);
    }
    return res
};

export default CreateCar;

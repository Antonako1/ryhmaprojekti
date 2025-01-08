import sequelize from "../config/db";
import AlcoholDetails from "../modules/AlcoholDetails";
import Product from "../modules/Product";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRoles } from "../modules/User";

dotenv.config();
const CreateAlcohol = async (req: any, res: any): Promise<any> => {
    const transaction = await sequelize.transaction();
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    try {
        const secret: string = process.env.JWT_SECRET || '';

        // Verify the token
        const decoded: any = jwt.verify(token, secret);
        decoded.role !== UserRoles.ADMIN ? res.status(401).json({ message: 'Unauthorized: Insufficient role' }) : null;
        
        const {
            name,
            price,
            stock,
            image,
            description,
            alcoholType,
            alcoholBrand,
            alcoholVolume,
            alcoholYear,
        } = req.body;

        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            image: image,
            description: description,
        }, { transaction });

        const alcohol = await AlcoholDetails.create({
            alcoholType: alcoholType,
            alcoholBrand: alcoholBrand,
            alcoholVolume: alcoholVolume,
            alcoholYear: alcoholYear,
            product_id: product.product_id,
        }, { transaction });
            
        await transaction.commit();
        
        return res.status(201).json({
            message: "Alcohol created successfully",
            product,
            alcohol,
        });
    } catch (error: any) {
        console.error(error);
        await transaction.rollback();
        res.status(500).send("Internal Server Error: " + error);
    }
    return res;
}

export default CreateAlcohol;
import Transaction from "../modules/Transaction";
import Product from "../modules/Product";
import User from "../modules/User";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import sequelize from "../config/db";

dotenv.config();
const handleTransaction = async (req: any, res: any): Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const transaction = await sequelize.transaction();

    try {
        const secret: string = process.env.JWT_SECRET || '';
        if(!secret) {
            return res.status(500).json({ message: 'Internal Server Error: JWT secret missing' });
        }
        // Verify the token
        const decoded: any = jwt.verify(token, secret);
        !decoded ? res.status(401).json({ message: 'Unauthorized: Invalid token' }) : null;
        
        const { product_id, user_id, quantity, moneySpent } = req.body;
        const { type } = req.query;
        if(type !== "BUY" && type !== "DEPO") {
            transaction.rollback();
            return res.status(400).json({ message: "Invalid transaction type" });
        }
        if(type === "BUY") {
            const product = await Product.findOne({ where: { product_id } });
            if(!product) {
                transaction.rollback();
                return res.status(404).json({ message: "Product not found" });
            }
            if(product.stock < quantity) {
                transaction.rollback();
                return res.status(400).json({ message: "Not enough stock" });
            }
            const user = await User.findOne({ where: { user_id } });
            if(!user) {
                transaction.rollback();
                return res.status(404).json({ message: "User not found" });
            }
            if(user.balance < moneySpent) {
                transaction.rollback();
                return res.status(400).json({ message: "Not enough balance" });
            }
            await Transaction.create({ product_id, user_id, quantity, moneySpent, type }, { transaction });
            await Product.update({ stock: product.stock - quantity }, { where: { product_id }, transaction });
            await User.update({ balance: user.balance - moneySpent }, { where: { user_id }, transaction });
            await transaction.commit();
            return res.status(200).json({ message: "Buy transaction successful" });
        }
        else {
            const user = await User.findOne({ where: { user_id } });
            if(!user) {
                transaction.rollback();
                return res.status(404).json({ message: "User not found" });
            }
            await Transaction.create({ product_id, user_id, quantity, moneySpent, type }, { transaction });
            await User.update({ balance: user.balance + moneySpent }, { where: { user_id }, transaction });
            await transaction.commit();
            return res.status(200).json({ message: "Depo transaction successful" });
        }
    } catch (error:any) {
        res.status(500).send("Internal Server Error");
        transaction.rollback();
    }
    return res;
}
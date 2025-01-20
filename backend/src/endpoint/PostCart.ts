import sequelize from "../config/db";
import CartWishlist from "../modules/CartWishlist";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const PostCart = async (req: any, res: any) :Promise<any> =>{
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const secret: string = process.env.JWT_SECRET || '';

    const decoded: any = jwt.verify(token, secret);
    if(!decoded) return res.status(401).json({ message: 'Unauthorized: Token missing' });

    const transaction = await sequelize.transaction();
    try {
        const { 
            productId,
            quantity,
            userId,
        } = req.body;

        const { type } = req.query; // "CART" or "WISHLIST"

        const postCart = await CartWishlist.create({
            userId: userId,
            productId: productId,
            quantity: quantity,
            type
        },{ transaction });

        await transaction.commit();

        res.status(201).json({
            message: `Added to ${type=="WISHLIST"?"wishlist":"cart"} succesfully`,
            postCart
        });
    } catch (error:any) {
        await transaction.rollback();
        console.error(error.message)
        res.status(500).send('Failed to add to cart!')
    }
    
    return res
}

export default PostCart;
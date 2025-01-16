import sequelize from "../config/db";
import CartWishlist from "../modules/CartWishlist";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const PostCart = async (req: any, res: any) :Promise<any> =>{
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token, req.headers);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const secret: string = process.env.JWT_SECRET || '';

    const decoded: any = jwt.verify(token, secret);
    if(!decoded) res.status(401).json({ message: 'Unauthorized: Token missing' });

    const transaction = await sequelize.transaction();
    try {
        const { 
            id,
            productId,
            quantity,
            userId,
            createdAt,
            updatedAt,
        } = req.body;

        const postCart = await CartWishlist.create({
            id: id,
            userId: userId,
            productId: productId,
            quantity: quantity,
            createdAt: createdAt,
            updatedAt: updatedAt,
        },{ transaction });

        await transaction.commit();

        res.status(201).json({
            message: "Added to cart succesfully!",
            postCart
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error)
        res.status(500).send('Failed to add to cart!')
    }
    
    return res
}

export default PostCart;
import sequelize from "../config/db";
import CartWishlist from "../modules/CartWishlist";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const GetCartWishlist = async (req : any, res : any):Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const secret: string = process.env.JWT_SECRET || '';
    
    try {
        
        const decoded: any = jwt.verify(token, secret);
        if(!decoded) res.status(401).json({ message: 'Unauthorized: Token missing' });
    
        const { type, userId } = req.query;
        if(!type || !userId) return res.status(400).json({ message: 'Bad Request: Missing query parameters' });
    
        const cartWishlist = await CartWishlist.findAll({
            where: {
                userId: userId,
                type: type
            }
        });
    
        return res.status(200).json(cartWishlist);
    } catch (error:any) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', extra: error.message });
    }
}

export default GetCartWishlist;
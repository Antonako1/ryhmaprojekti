import sequelize from "../config/db";
import Review from "../modules/Review";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const GetReview = async (req:any, res :any) : Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    try {
        const secret: string = process.env.JWT_SECRET || '';
    
        const decoded: any = jwt.verify(token, secret);
        if(!decoded) res.status(401).json({ message: 'Unauthorized: Token missing' });
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error, Ty dibil")
        return res;
    }
    
    try {
        const { type, limit, offset } = req.query; // SITE, ALCOHOL, CARS
        const parsedLimit = parseInt(limit as string, 10) || 10;
        const parsedOffset = parseInt(offset as string, 10) || 0;
        const parsedType = type === "" ? "SITE" : type
        
        if(parsedType == "SITE") {
            const reviews = await Review.findAndCountAll({
                limit: parsedLimit,
                offset: parsedOffset,
                where: {
                    type: parsedType
                }
            });

            res.status(200).json({
                total: reviews.count,
                reviews: reviews.rows
            })
        }
    } catch (error:any) {
        console.error(error)
        res.status(500).send("Internal server error");
    }
    
    return res;
}

export default GetReview;
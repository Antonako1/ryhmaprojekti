import sequelize from "../config/db";
import Review from "../modules/Review";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const PostReview = async (req: any, res: any) :Promise<any> =>{
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token, req.headers);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const secret: string = process.env.JWT_SECRET || '';

    const decoded: any = jwt.verify(token, secret);
    if(!decoded) res.status(401).json({ message: 'Unauthorized: Token missing' });
    const { type } = req.query; // SITE, ALCOHOL, CARS
    
    const transaction = await sequelize.transaction();
    if(!type) {
        await transaction.rollback();
        return res.status(400).json({ message: 'Type is required' });
    }
    if(!["SITE", "ALCOHOL", "CARS"].includes(type.toUpperCase())) {
        await transaction.rollback();
        return res.status(400).json({ message: 'Invalid type. Must be SITE, ALCOHOL or CARS' });
    }

    // Creates a review
    try {
        const { 
            name,
            rating,
            reviewText,
            userId,
            product_id
        } = req.body;
        console.log(req.body)


        const postReview = await Review.create({
            review: reviewText,
            rating: rating,
            UserId: userId,
            name: name,
            type: type,
            product_id: product_id,
        },{ transaction });

        await transaction.commit();

        return res.status(201).json({
            message: "Review created succesfully!",
            postReview
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error)
        return res.status(500).send('Failed to create a review!')
    }
}

export default PostReview;
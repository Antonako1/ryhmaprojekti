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
    const transaction = await sequelize.transaction();
    try {
        const { 
            name,
            rating,
            reviewText,
            userId,
        } = req.body;

        const postReview = await Review.create({
            review: reviewText,
            rating: rating,
            UserId: userId,
            name: name,
            type: 'SITE',
            product_id: null,
        },{ transaction });

        await transaction.commit();

        res.status(201).json({
            message: "Review created succesfully!",
            postReview
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error)
        res.status(500).send('Failed to create a review!')

    }return res
}

export default PostReview;
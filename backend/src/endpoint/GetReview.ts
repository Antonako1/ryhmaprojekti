import { Request, Response } from 'express';
import sequelize from '../config/db';
import Review from '../modules/Review';
import CarDetails from '../modules/CarDetails';
import AlcoholDetails from '../modules/AlcoholDetails';
import dotenv from 'dotenv';

dotenv.config();

const GetReview = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { type = 'SITE', limit = '10', offset = '0' } = req.query;

    console.log('Fetching reviews for:', type);

    const parsedLimit = parseInt(limit as string, 10);
    const parsedOffset = parseInt(offset as string, 10);

    const include = [];
    if (type === 'CARS') {
      include.push({
        model: CarDetails,
        as: 'carDetails',
      });
    } else if (type === 'ALCOHOL') {
      include.push({
        model: AlcoholDetails,
        as: 'alcoholDetails',
      });
    }

    const reviews = await Review.findAndCountAll({
      limit: parsedLimit,
      offset: parsedOffset,
      where: { type },
      include,
    });

    return res.status(200).json({
      total: reviews.count,
      reviews: reviews.rows,
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error.message);
    return res.status(500).send('Internal server error');
  }
};

export default GetReview;

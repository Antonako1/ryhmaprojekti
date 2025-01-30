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

    const parsedLimit = isNaN(parseInt(limit as string, 10)) ? 10 : parseInt(limit as string, 10);
    const parsedOffset = isNaN(parseInt(offset as string, 10)) ? 0 : parseInt(offset as string, 10);

    const include: any[] = [];

    // Ensure the alias matches the one defined in the Review model
    if (type === 'CARS') {
      include.push({
        model: CarDetails,
        as: 'CarDetails',  // Match alias defined in the Review model
      });
    } else if (type === 'ALCOHOL') {
      include.push({
        model: AlcoholDetails,
        as: 'AlcoholDetails',  // Use the alias defined in the model association
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
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).send('Internal server error');
  }
};

export default GetReview;

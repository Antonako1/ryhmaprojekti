import { Request, Response } from "express";
import { Op } from "sequelize";  // Import Sequelize operators
import CarDetails from "../modules/CarDetails";
import Product from "../modules/Product";

const AllCars = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { limit, offset, search } = req.query;
    const parsedLimit = parseInt(limit as string, 10) || 10;
    const parsedOffset = parseInt(offset as string, 10) || 0;

    const searchConditions = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { '$productDetails.name$': { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const cars = await CarDetails.findAndCountAll({
      limit: parsedLimit,
      offset: parsedOffset,
      include: [
        {
          model: Product,
          as: "productDetails",
          where: searchConditions,
        },
      ],
    });

    return res.status(200).json({
      total: cars.count,
      cars: cars.rows,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};

export default AllCars;

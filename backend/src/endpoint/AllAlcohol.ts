import { Request, Response } from "express";
import AlcoholDetails from "../modules/AlcoholDetails";
import Product from "../modules/Product";
import { Op } from "sequelize";

const AllAlcohol = async (req: Request, res: Response): Promise<Response> => {
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


    const alcohols = await AlcoholDetails.findAndCountAll({
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

    // Return the results with metadata
    return res.status(200).json({
      total: alcohols.count,
      alcohols: alcohols.rows,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};

export default AllAlcohol;

import { Request, Response } from "express";
import AlcoholDetails from "../modules/AlcoholDetails";
import Product from "../modules/Product";

const AllAlcohol = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { limit, offset } = req.query;
    const parsedLimit = parseInt(limit as string, 10) || 10;
    const parsedOffset = parseInt(offset as string, 10) || 0;

    // Fetch alcohols with pagination and associated Product details
    const alcohols = await AlcoholDetails.findAndCountAll({
      limit: parsedLimit,
      offset: parsedOffset,
      include: [
        {
          model: Product,
          as: "productDetails", // Association with Product
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

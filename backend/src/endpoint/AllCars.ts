import { Request, Response } from "express";
import Product from "../modules/Product";
import CarDetails from "../modules/CarDetails";
import AlcoholDetails from "../modules/AlcoholDetails";

const AllCars = async (req: any, res: any): Promise<any> => {
    try {
        const { limit, offset } = req.query;
        const parsedLimit = parseInt(limit as string, 10) || 10;
        const parsedOffset = parseInt(offset as string, 10) || 0;

        const cars = await Product.findAll({
            limit: parsedLimit,
            offset: parsedOffset,
            include: [
                {
                    model: CarDetails,
                    as: "carDetails", // Alias defined in associations
                    attributes: ["id", "carMake", "carModel", "carYear", "carMileage"], // Specify fields from CarDetails
                },
            ],
            attributes: ["product_id", "name", "price", "stock", "image", "description"], // Specify fields from Product
        });

        // Transform the data into the desired structure
        cars.map((car: any) => {
            if (car.carDetails !== null) {
                return {
                    product: {
                        product_id: car.product_id,
                        name: car.name,
                        price: car.price,
                        stock: car.stock,
                        image: car.image,
                        description: car.description,
                    },
                    details: car.carDetails,
                };
            } else {
                return null;
            }
        });

        // Remove null values
        cars.filter((car: any) => car !== null);
        

        return res.status(200).json(cars);
    } catch (error: any) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error.message);
    }
};

export default AllCars;

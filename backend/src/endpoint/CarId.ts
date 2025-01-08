import sequelize from "../config/db";
import CarDetails from "../modules/CarDetails";
import Product from "../modules/Product";

const CarId =  async (req: any , res: any) : Promise<any> => {
    const { id } = req.params;
    try {
        const car = await CarDetails.findOne({
            where: { id },
            include: [
                {
                    model: Product,
                    as: "productDetails",
                }
            ],
            
        });
        if (!car) {
            return res.status(404).send("Car not found");
        }
        return res.status(200).send(car);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error);
    }
}

export default CarId;
import sequelize from "../config/db";
import AlcoholDetails from "../modules/AlcoholDetails";
import Product from "../modules/Product";

const AlcoholId =  async (req: any , res: any) : Promise<any> => {
    const { id } = req.params;
    try {
        const alcohol = await AlcoholDetails.findOne({
            where: { id },
            include: [
                {
                    model: Product,
                    as: "productDetails",
                }
            ]
        });
        if (!alcohol) {
            return res.status(404).send("Alcohol not found");
        }
        return res.json(alcohol);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error);
    }
    return res
}

export default AlcoholId;
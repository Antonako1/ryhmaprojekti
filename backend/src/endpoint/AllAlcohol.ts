import AlcoholDetails from "../modules/AlcoholDetails";
import Product from "../modules/Product";

const AllAlcohol = async (req: any, res: any): Promise<any> => {
    try {
        const { limit, offset } = req.query;
        const parsedLimit = parseInt(limit as string, 10) || 10;
        const parsedOffset = parseInt(offset as string, 10) || 0;

        const alcohol = await Product.findAll({
            limit: parsedLimit,
            offset: parsedOffset,
            include: [
                {
                    model: AlcoholDetails,
                    as: "alcoholDetails", // Alias defined in associations
                    attributes: ["id", "alcoholType", "alcoholBrand", "alcoholVolume", "alcoholYear"], // Specify fields from AlcoholDetails
                },
            ],
            attributes: ["product_id", "name", "price", "stock", "image", "description"], // Specify fields from Product
        });

        // Transform the data into the desired structure
        const result = alcohol.map((alcohol: any) => {
            if (alcohol.alcoholDetails !== null) {
                return {
                    product: {
                        product_id: alcohol.product_id,
                        name: alcohol.name,
                        price: alcohol.price,
                        stock: alcohol.stock,
                        image: alcohol.image,
                        description: alcohol.description,
                    },
                    details: alcohol.alcoholDetails,
                };
            } else {
                return null;
            }
        });

        alcohol.filter((alc: any) => alc !== null);
        

        return res.status(200).json(result);
    } catch (error:any) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error.message);
    }
}

export default AllAlcohol;
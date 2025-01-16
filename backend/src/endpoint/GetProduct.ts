import CarDetails from "../modules/CarDetails";
import Product from "../modules/Product";
import AlcoholDetails from "../modules/AlcoholDetails";

const GetProduct = async (req: any, res: any):Promise<any> => {
    const { id } = req.query;
    try {
        const product = await Product.findOne({
            where: { 
                product_id: id
            },
            include: [
                {
                    model: CarDetails,
                    as: "carDetails",
                },
                {
                    model: AlcoholDetails,
                    as: "alcoholDetails",
                }
            ]
        });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        return res.status(200).send(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error);
    }
}

export default GetProduct;
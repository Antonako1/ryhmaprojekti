import sequelize from "../config/db";
import AlcoholDetails from "../modules/AlcoholDetails";
import Product from "../modules/Product";

const CreateAlcohol = async (req: any, res: any): Promise<any> => {
    const transaction = await sequelize.transaction();

    try {
        const {
            name,
            price,
            stock,
            image,
            description,
            alcoholType,
            alcoholBrand,
            alcoholVolume,
            alcoholYear,
        } = req.body;

        const product = await Product.create({
            name: name,
            price: price,
            stock: stock,
            image: image,
            description: description,
        }, { transaction });

        const alcohol = await AlcoholDetails.create({
            alcoholType: alcoholType,
            alcoholBrand: alcoholBrand,
            alcoholVolume: alcoholVolume,
            alcoholYear: alcoholYear,
            product_id: product.product_id,
        }, { transaction });
            
        await transaction.commit();
        
        return res.status(201).json({
            message: "Alcohol created successfully",
            product,
            alcohol,
        });
    } catch (error: any) {
        console.error(error);
        await transaction.rollback();
        res.status(500).send("Internal Server Error: " + error);
    }
    return res;
}

export default CreateAlcohol;
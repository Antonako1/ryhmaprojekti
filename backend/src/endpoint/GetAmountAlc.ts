import sequelize from "../config/db";

const GetAmountAlc = async (req: any, res: any) : Promise<any> => {
    try {
        const AmountAlc = await sequelize.query('SELECT COUNT(*) FROM alcohols');
        const AmountReviews = await sequelize.query('SELECT COUNT(*) FROM reviews WHERE type = "alcohol"');

        res.status(200).json({
            AmountAlc,
            AmountReviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
    return res
}

export default GetAmountAlc;
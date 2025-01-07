import sequelize from "../config/db";

const GetAmountCar = async (req: any, res: any) : Promise<any> => {
    try {
        const AmountOfCars = await sequelize.query('SELECT COUNT(*) FROM cars');
        const AmountOfReviews = await sequelize.query('SELECT COUNT(*) FROM reviews WHERE type = "car"');
        
        res.status(200).json({
            AmountOfCars,
            AmountOfReviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error: " + error);
    }
    return res
}

export default GetAmountCar;
    
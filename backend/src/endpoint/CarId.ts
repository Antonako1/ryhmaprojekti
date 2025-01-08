import sequelize from "../config/db";

const CarId =  async (req: any , res: any) : Promise<any> => {
    const { id } = req.params;
    try {
        const car = await sequelize.models.Car.findOne({
            where: {
                id: id
            }
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
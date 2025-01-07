import sequelize from "../config/db";

const AlcoholId =  async (req: any , res: any) : Promise<any> => {
    const { id } = req.params;
    try {
        const alcohol = await sequelize.models.Alcohol.findOne({
            where: {
                id: id
            }
        });
        if (!alcohol) {
            return res.status(404).send("Alcohol not found");
        }
        return res.status(200).send(alcohol);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error);
    }
    return res
}

export default AlcoholId;
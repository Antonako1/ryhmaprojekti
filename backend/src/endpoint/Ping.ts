import sequelize from "../config/db";

const Ping = async (req: any, res: any) : Promise<any> => {
    const [rows] = await sequelize.query('SELECT 1 + 1 AS result');
    res.status(200).json({ message: 'Pong!', result: rows });
    return res
}

export default Ping;
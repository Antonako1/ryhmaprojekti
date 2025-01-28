import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const VerifyToken = async (req: any, res: any) : Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send("No token provided");
    }
    const secret: string = process.env.JWT_SECRET || "";
    if (!secret) {
        return res.status(500).json({message: "Internal Server Error: JWT secret missing"});
    }
    jwt.verify(token, secret, (err:any, user:any) => {
        if (err) {
            return res.status(403).json({message: "Failed to authenticate token"});
        }
        return res.status(200).json(user);
    });

    return res;
}

export default VerifyToken;
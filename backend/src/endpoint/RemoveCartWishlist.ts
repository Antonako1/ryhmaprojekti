import sequelize from "../config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CartWishlist from "../modules/CartWishlist";

dotenv.config();

const RemoveCartWishlist = async (req: any, res: any): Promise<any> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const secret: string = process.env.JWT_SECRET || "";
  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  const userId = decoded?.id; // Assuming the token contains the user's ID
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Invalid token data" });
  }

  const { type, productId } = req.query;

  if (!type || !["CART", "WISHLIST"].includes(type.toUpperCase())) {
    return res.status(400).json({ message: "Invalid type. Must be 'CART' or 'WISHLIST'" });
  }

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const result = await CartWishlist.destroy({
      where: {
        userId: userId,
        productId: productId,
        type: type.toUpperCase(),
      },
    });

    if (result === 0) {
      return res.status(404).json({
        message: `No item found in ${type.toUpperCase()} with product ID: ${productId}`,
      });
    }

    return res.status(200).json({
      message: `Item successfully removed from ${type.toUpperCase()}`,
    });
  } catch (error: any) {
    console.error("Error removing item from cart/wishlist:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export default RemoveCartWishlist;

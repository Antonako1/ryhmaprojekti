import sequelize from "../config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Transaction from "../modules/Transaction";
import Product from "../modules/Product";
import User from "../modules/User";
import CartWishlist from "../modules/CartWishlist";

interface BuyRequest {
  listing: {
    productId: number;
    quantity: number;
  }[];
}

dotenv.config();

const Buy = async (req: any, res: any): Promise<any> => {
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

  const { listing } = req.body as BuyRequest;
  if (!listing || !Array.isArray(listing) || listing.length === 0) {
    return res.status(400).json({ message: "Invalid request: Missing or invalid listing" });
  }

  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    let totalSpent = 0;

    for (const item of listing) {
      const { productId, quantity } = item;

      // Fetch product details
      const product = await Product.findOne({ where: { product_id: productId } });
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for product ID ${productId}`);
      }

      // Calculate money spent for this item
      const moneySpent = product.price * quantity;
      totalSpent += moneySpent;

      // Remove the item from the cart
      const removed = await CartWishlist.destroy({
        where: {
            userId: userId,
          productId: productId,
          type: "CART",
        },
        transaction,
      });

      if (removed === 0) {
        throw new Error(`Item with product ID ${productId} not found in cart`);
      }

      // Deduct stock and update product
      product.stock -= quantity;
      await product.save({ transaction });

      // Record the transaction
      await Transaction.create(
        {
          quantity,
          moneySpent,
          type: "BUY",
          product_id: productId,
          user_id: userId,
        },
        { transaction }
      );
    }

    // Validate user's balance
    if (user.balance < totalSpent) {
      throw new Error("Insufficient balance");
    }

    // Deduct from user's balance
    user.balance -= totalSpent;
    await user.save({ transaction });

    // Commit transaction
    await transaction.commit();

    return res.status(200).json({
        message: "Purchase completed successfully",
        totalSpent,
        balanceLeft: user.balance,
    });
  } catch (error: any) {
    await transaction.rollback();
    console.error("Error during purchase:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export default Buy;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';
import User from './User';

class CartWishlist extends Model {
    public id!: number;
    public userId!: number; // Foreign key for User
    public productId!: number; // Foreign key for Product
    public quantity!: number; // Quantity of products
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CartWishlist.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onDelete: 'CASCADE', // Automatically delete if the user is deleted
            onUpdate: 'CASCADE',
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Product,
                key: 'product_id',
            },
            onDelete: 'CASCADE', // Automatically delete if the product is deleted
            onUpdate: 'CASCADE',
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1, // Ensure quantity is at least 1
            },
        },
    },
    {
        sequelize,
        tableName: 'cart_wishlist',
        timestamps: true, // Enable automatic timestamps
    }
);

export default CartWishlist;

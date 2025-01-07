import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class CartWishlist extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;   
}

CartWishlist.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'cart_wishlist',
    sequelize,
});

export default CartWishlist;
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
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';

class Review extends Product {
    public id!: number;
    public review!: string;
    public rating!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public ProductId!: number;
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'reviews',
    }
);

export default Review;
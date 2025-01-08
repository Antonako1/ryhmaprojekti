import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';
import User from './User';

class Review extends Model {
    public id!: number;
    public review!: string;
    public rating!: number;
    public type!: string; // ALCOHOL or CAR
    public product_id!: number; // Foreign key for Product
    public UserId!: number; // Foreign key for User
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5, // Assuming ratings are on a scale of 1-5
            },
        },
        type: {
            type: DataTypes.ENUM('ALCOHOL', 'CAR'), // Enum to restrict values
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'product_id',
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'reviews',
        timestamps: true, // Ensure createdAt and updatedAt are managed automatically
    }
);

export default Review;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';
import User from './User';
import CarDetails from './CarDetails';
import AlcoholDetails from './AlcoholDetails';

class Review extends Model {
    public id!: number;
    public review!: string;
    public rating!: number;
    public type!: 'ALCOHOL' | 'CARS' | 'SITE'; // "ALCOHOL", "CARS", or "SITE"
    public product_id!: number; // Foreign key for Product
    public UserId!: number; // Foreign key for User
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate() {
        // Association with Product
        Review.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

        // Association with User
        Review.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

        // Association with CarDetails
        Review.belongsTo(CarDetails, { foreignKey: 'product_id', as: 'carDetails' });

        // Association with AlcoholDetails
        Review.belongsTo(AlcoholDetails, { foreignKey: 'product_id', as: 'alcoholDetails' });
    }
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
            type: DataTypes.ENUM('ALCOHOL', 'CARS', 'SITE'), // Enum to restrict values
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Product,
                key: 'id', // Ensure this matches the primary key of the Product table
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id', // Ensure this matches the primary key of the User table
            },
        },
    },
    {
        sequelize,
        tableName: 'reviews',
        timestamps: true, // Ensure createdAt and updatedAt are managed automatically
    }
);

// Set up associations
Review.associate();

export default Review;

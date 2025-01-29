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
    public type!: 'ALCOHOL' | 'CARS' | 'SITE';
    public product_id!: number | null;
    public UserId!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Optional fields for conditional relationships
    public carDetailsId?: number; // Associated carDetails when type is 'CARS'
    public alcoholDetailsId?: number; // Associated alcoholDetails when type is 'ALCOHOL'
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
                max: 5,
            },
        },
        type: {
            type: DataTypes.ENUM('ALCOHOL', 'CARS', 'SITE'),
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
                key: 'product_id', // Match the primary key of Product
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
        carDetailsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: CarDetails,
                key: 'id',
            },
        },
        alcoholDetailsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: AlcoholDetails,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'reviews',
        timestamps: true,
    }
);

// Define relationships
Review.belongsTo(Product, { foreignKey: 'product_id', as: 'Product' });
Review.belongsTo(User, { foreignKey: 'UserId', as: 'User' });
Review.belongsTo(CarDetails, { foreignKey: 'carDetailsId', as: 'CarDetails' });
Review.belongsTo(AlcoholDetails, { foreignKey: 'alcoholDetailsId', as: 'AlcoholDetails' });
export default Review;

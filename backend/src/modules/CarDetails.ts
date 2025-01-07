import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';

class CarDetails extends Product {
    public id!: number;
    public carMake!: string;
    public carModel!: string;
    public carYear!: number;
    public carMileage!: number;
    public carPrice!: number;
    public carImage!: string;
    public carDescription!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public ProductId!: number;
}

CarDetails.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        carMake: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carModel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carMileage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'carDetails',
    }
);

export default CarDetails;
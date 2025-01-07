import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';

class AlcoholDetails extends Product {
    public id!: number;
    public alcoholType!: string;
    public alcoholBrand!: string;
    public alcoholPrice!: number;
    public alcoholImage!: string;
    public alchoholVolume!: number;
    public alcoholStock!: number;
    public alcoholDescription!: string;
    public alcoholRating!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public ProductId!: number;
}

AlcoholDetails.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        alcoholType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcoholBrand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcoholPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alcoholImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcoholVolume: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alcoholStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        alcoholDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcoholRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'alcoholDetails',
    }
);

export default AlcoholDetails;
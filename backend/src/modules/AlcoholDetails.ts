import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';

class AlcoholDetails extends Model {
    public id!: number;
    public alcoholType!: string;
    public alcoholBrand!: string;
    public alcoholVolume!: number;
    public alcoholYear!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public product_id!: number; // Foreign key
}

AlcoholDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    alcoholType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alcoholBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alcoholYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alcoholVolume: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    tableName: 'alcohols',
  }
);

// Association
Product.hasOne(AlcoholDetails, { foreignKey: 'product_id', as: 'alcoholDetails' });
AlcoholDetails.belongsTo(Product, { foreignKey: 'product_id', as: "productDetails" });

export default AlcoholDetails;

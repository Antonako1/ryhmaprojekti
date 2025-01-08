import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';

class CarDetails extends Model {
    public id!: number;
    public carMake!: string;
    public carModel!: string;
    public carYear!: number;
    public carMileage!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public product_id!: number; // Foreign key
}

CarDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    tableName: 'cars',
  }
);

// Association
Product.hasOne(CarDetails, { foreignKey: 'product_id', as: 'carDetails' });
CarDetails.belongsTo(Product, { foreignKey: 'product_id', as: "productDetails" });

export default CarDetails;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Product extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public stock!: number;
    public image!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public CarDetailsId!: number;       // 1 for this type, 0 for not
    public AlcoholDetailsId!: number;   // 1 for this type, 0 for not
    public ReviewId!: number;           // 1 for this type, 0 for not
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
  }
);

export default Product;
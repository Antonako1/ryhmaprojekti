import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Product from './Product';
import User from './User';

class Transaction extends Model {
    public id!: number;
    public quantity!: number;
    public moneySpent!: number;
    public type!: "BUY" | "DEPO";
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public product_id!: number; // Foreign key
    public user_id!: number; // Foreign key
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moneySpent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("BUY", "DEPO"),
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
  }
);

// Association
Product.hasMany(Transaction, { foreignKey: 'product_id', as: 'transactions' });
Transaction.belongsTo(Product, { foreignKey: 'product_id', as: "productDetails" });
Product.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id', as: "userDetails" });

export default Transaction;
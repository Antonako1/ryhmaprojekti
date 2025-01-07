import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public passwordHash!: string;
    public role!: string;
    public balance!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public cartWishlistId!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;

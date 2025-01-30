import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export enum UserRoles {
    ADMIN = 0x1,
    USER = 0x2,
}

export enum RollChances {
    Default = 0.6,
    Admin = 1.1,
    Streamer = 1.35
}

class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public passwordHash!: string;
    public role!: UserRoles;
    public balance!: number;
    public casinoRollChance!: number; // 0.0 - 1.0
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
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
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        casinoRollChance: {
            type: DataTypes.FLOAT,
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
        timestamps: true,
    }
);

export default User;

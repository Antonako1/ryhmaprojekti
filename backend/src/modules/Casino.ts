import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User, { UserRoles } from './User';

class Casino extends Model {
    public id!: number;
    public userId!: number;
    public betAmount!: number;
    public betNumber!: number;
    public winAmount!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Casino.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        betAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        betNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        winAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Casino',
    }
);

Casino.belongsTo(User, {
    foreignKey: 'userId',
});

export default Casino;
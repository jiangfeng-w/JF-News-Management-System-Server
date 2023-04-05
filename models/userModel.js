const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbconfig')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        introduction: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createTime: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'users',
    }
)

module.exports = User

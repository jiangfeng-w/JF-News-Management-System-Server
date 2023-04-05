const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbconfig')

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_brief: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_detail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        create_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        update_time: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'product',
    }
)

module.exports = Product

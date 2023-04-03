const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbconfig')

const News = sequelize.define(
    'News',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isPublishd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createTime: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        updateTime: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        table: 'news',
    }
)

module.exports = News

const { where } = require('sequelize')
const NewsModel = require('../../models/newsModel')

const NewsService = {
    // 添加新闻
    add: async ({ id, title, content, category, isPublishd, cover, createTime, updateTime }) => {
        return NewsModel.create({ id, title, content, category, isPublishd, cover, createTime, updateTime })
    },
}

module.exports = NewsService

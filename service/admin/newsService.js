const { where } = require('sequelize')
const NewsModel = require('../../models/newsModel')

const NewsService = {
    // 添加新闻
    add: async ({ id, title, content, category, isPublishd, cover, createTime, updateTime }) => {
        return NewsModel.create({ id, title, content, category, isPublishd, cover, createTime, updateTime })
    },
    // 获得新闻列表
    getList: async ({ id }) => {
        if (id) {
            return NewsModel.findOne({
                where: {
                    id,
                },
            })
        } else {
            return NewsModel.findAll({
                order: [['createTime', 'ASC']],
            })
        }
    },
    // 发布新闻
    publish: async ({ id, isPublishd, updateTime }) => {
        return NewsModel.update({ isPublishd, updateTime }, { where: { id } })
    },
    // 删除新闻
    delList: async ({ id }) => {
        return NewsModel.destroy({
            where: {
                id,
            },
        })
    },
    // 更新新闻
    updateNews: async ({ id, title, content, category, cover, updateTime }) => {
        return NewsModel.update({ title, content, category, cover, updateTime }, { where: { id } })
    },
}

module.exports = NewsService

const { where } = require('sequelize')
const ProductModel = require('../../models/ProductModel')

const ProductService = {
    // 添加产品
    add: async ({ id, product_name, product_brief, product_detail, product_image, create_time, update_time }) => {
        return ProductModel.create({
            id,
            product_name,
            product_brief,
            product_detail,
            product_image,
            create_time,
            update_time,
        })
    },
    // 获取产品列表
    getList: async ({ id }) => {
        if (id) {
            return ProductModel.findOne({
                where: {
                    id,
                },
            })
        } else {
            return ProductModel.findAll({
                order: [['create_time', 'ASC']],
            })
        }
    },
    // 删除产品
    delList: async ({ id }) => {
        return ProductModel.destroy({
            where: {
                id,
            },
        })
    },
    // 更新产品
    update: async ({ id, product_name, product_brief, product_detail, product_image, update_time }) => {
        return ProductModel.update(
            {
                product_name,
                product_brief,
                product_detail,
                product_image,
                update_time,
            },
            { where: { id } }
        )
    },
}

module.exports = ProductService

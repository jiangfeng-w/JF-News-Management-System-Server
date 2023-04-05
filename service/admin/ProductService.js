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
}

module.exports = ProductService

const ProductService = require('../../service/admin/ProductService')
const { v4: uuidv4 } = require('uuid')

const ProductController = {
    // 添加新闻
    add: async (req, res) => {
        // console.log(req.body)
        // console.log(req.file)
        const { product_name, product_brief, product_detail } = req.body
        const product_image = `http://localhost:3000/images/productImage/${req.file.filename}`

        // 生成uuid
        const id = uuidv4()
        // 创建时间
        const create_time = Date.now()
        // 更新时间
        const update_time = create_time

        // 交给service层处理
        try {
            // console.log('开始处理')
            const result = await ProductService.add({
                id,
                product_name,
                product_brief,
                product_detail,
                product_image,
                create_time,
                update_time,
            })
            res.status(201).send({
                message: '产品添加成功',
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: '产品添加失败' })
        }
    },
}

module.exports = ProductController

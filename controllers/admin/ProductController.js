const ProductService = require('../../service/admin/ProductService')
const deleteProductImage = require('../../utils/deleteProductImage')
const { v4: uuidv4 } = require('uuid')

const ProductController = {
    // 添加产品
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
    // 获取产品信息
    getList: async (req, res) => {
        try {
            const list = await ProductService.getList(req.params)
            res.status(200).send({
                message: '获取产品列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: '获取产品列表失败',
                error: err.message,
            })
        }
    },
    // 删除产品
    delList: async (req, res) => {
        const result = await ProductService.delList({ id: req.params.id })
        if (result === 1) {
            // 删除封面
            deleteProductImage(req.body.product_image)
            res.status(200).send({
                message: '删除成功',
            })
        } else {
            res.status(400).send({
                message: '删除失败',
            })
        }
    },
    // 修改产品信息
    update: async (req, res) => {
        // 把数据解构出来
        let { id, product_name, product_brief, product_detail, product_image, oldImage } = req.body
        // 如果上传了文件，即更换了产品图
        if (req.file) {
            product_image = `http://localhost:3000/images/productImage/${req.file.filename}`
            // 删除旧产品图
            deleteProductImage(oldImage)
        }

        let newData = {
            id,
            product_name,
            product_brief,
            product_detail,
            product_image,
            update_time: Date.now(),
        }
        const result = await ProductService.update(newData)
        // console.log(result)
        if (result[0] === 1) {
            res.status(200).send({
                message: '更新成功',
            })
        } else {
            res.status(400).send({
                message: '更新失败',
            })
        }
    },
}

module.exports = ProductController

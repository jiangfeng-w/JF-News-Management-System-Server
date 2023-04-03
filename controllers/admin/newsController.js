const { and } = require('sequelize')
const NewsService = require('../../service/admin/newsService')
const { v4: uuidv4 } = require('uuid')

const NewsController = {
    add: async (req, res) => {
        // console.log(req.body)
        // console.log(req.file)
        const { title, content, category, isPublishd } = req.body
        const cover = `http://localhost:3000/images/newsCover/${req.file.filename}`

        // 生成uuid
        const id = uuidv4()
        // 创建时间
        const createTime = Date.now()
        // 更新时间
        const updateTime = createTime

        // 交给service层处理
        try {
            // console.log('开始处理')
            const result = await NewsService.add({
                id,
                title,
                content,
                category: Number(category),
                isPublishd: Number(isPublishd),
                cover,
                createTime,
                updateTime,
            })
            console.log(result)
            res.status(201).send({
                message: '新闻添加成功',
            })
        } catch (error) {
            res.status(500).send({ message: '新闻添加失败' })
        }
    },
}

module.exports = NewsController

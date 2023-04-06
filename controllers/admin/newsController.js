const { and } = require('sequelize')
const NewsService = require('../../service/admin/newsService')
const deleteCover = require('../../utils/deleteCover')
const { v4: uuidv4 } = require('uuid')

const NewsController = {
    // 添加新闻
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
            res.status(201).send({
                message: '新闻添加成功',
            })
        } catch (error) {
            res.status(500).send({ message: '新闻添加失败' })
        }
    },
    // 获取新闻
    getList: async (req, res) => {
        try {
            const list = await NewsService.getList(req.params)
            res.status(200).send({
                message: '获取新闻列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: '获取新闻列表失败',
                error: err.message,
            })
        }
    },
    // 发布新闻
    publish: async (req, res) => {
        const result = await NewsService.publish({
            ...req.body,
            updateTime: Date.now(),
        })
        if (result[0] === 1) {
            res.status(200).send({
                message: '更新成功',
            })
        } else {
            res.status(400).send({
                message: '更新失败',
            })
        }
        // console.log('1111')
    },
    // 删除新闻
    delList: async (req, res) => {
        const result = await NewsService.delList({ id: req.params.id })
        if (result === 1) {
            // 删除封面
            deleteCover(req.body.cover)
            res.status(200).send({
                message: '删除成功',
            })
        } else {
            res.status(400).send({
                message: '删除失败',
            })
        }
    },
    // 修改新闻
    updateNews: async (req, res) => {
        // 把数据解构出来
        let { id, title, content, category, cover, oldCover } = req.body
        // 如果上传了文件，即更换了封面
        if (req.file) {
            cover = `http://localhost:3000/images/newsCover/${req.file.filename}`
            // 删除旧封面
            deleteCover(oldCover)
        }

        let newData = {
            id,
            title,
            content,
            category,
            cover,
            updateTime: Date.now(),
        }
        const result = await NewsService.updateNews(newData)
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

module.exports = NewsController

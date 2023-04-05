const express = require('express')
const NewsController = require('../../controllers/admin/newsController')
const multer = require('multer')
const upload = multer({ dest: 'public/images/newsCover/' })

const router = express.Router()

// 添加新闻
router.post('/admin/news/add', upload.single('file'), NewsController.add)
// 获取新闻列表
router.get('/admin/news/list', NewsController.getList)
router.get('/admin/news/list/:id', NewsController.getList)
// 删除新闻
router.put('/admin/news/list/:id', NewsController.delList)
// 发布新闻
router.put('/admin/news/publish', NewsController.publish)
// 修改新闻
router.post('/admin/news/list', upload.single('file'), NewsController.updateNews)

module.exports = router

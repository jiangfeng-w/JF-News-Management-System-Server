const express = require('express')
const ProductController = require('../../controllers/admin/ProductController')
const multer = require('multer')
const upload = multer({ dest: 'public/images/productImage/' })

const router = express.Router()

// 添加产品
router.post('/admin/product/add', upload.single('file'), ProductController.add)
// 获取产品列表
router.get('/admin/product/list', ProductController.getList)
router.get('/admin/product/list/:id', ProductController.getList)
// 删除产品
router.put('/admin/product/list/:id', ProductController.delList)
// 修改产品
router.post('/admin/product/list', upload.single('file'), ProductController.update)

module.exports = router

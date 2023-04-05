const express = require('express')
const ProductController = require('../../controllers/admin/ProductController')
const multer = require('multer')
const upload = multer({ dest: 'public/images/productImage/' })

const router = express.Router()

// 添加产品
router.post('/admin/product/add', upload.single('file'), ProductController.add)

module.exports = router

const express = require('express')
const NewsController = require('../../controllers/admin/newsController')
const multer = require('multer')
const upload = multer({ dest: 'public/images/newsCover/' })

const router = express.Router()

router.post('/admin/news/add', upload.single('file'), NewsController.add)

module.exports = router

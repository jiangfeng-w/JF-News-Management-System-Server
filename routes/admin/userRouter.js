const express = require('express')
const UserController = require('../../controllers/admin/userController')
const multer = require('multer')
const upload = multer({ dest: 'public/avatars/' })

const router = express.Router()
router.post('/admin/user/login', UserController.login)
router.post('/admin/user/upload', upload.single('file'), UserController.upload)

module.exports = router

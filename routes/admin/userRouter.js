const express = require('express')
const UserController = require('../../controllers/admin/userController')
const multer = require('multer')
const upload = multer({ dest: 'public/avatars/' })

const router = express.Router()

// 检查token是否过期
router.get('/admin/user/checkToken', () => {})

// 登录接口
router.post('/admin/user/login', UserController.login)
// 更新信息
router.post('/admin/user/upload', upload.single('file'), UserController.upload)
// 修改密码
router.post('/admin/user/changePass', UserController.changePass)
// 添加用户
router.post('/admin/user/add', upload.single('file'), UserController.add)

module.exports = router

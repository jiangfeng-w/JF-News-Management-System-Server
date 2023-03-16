const express = require('express')
const UserController = require('../../controllers/admin/userController')

const router = express.Router()

router.post('/admin/user/login', UserController.login)

module.exports = router

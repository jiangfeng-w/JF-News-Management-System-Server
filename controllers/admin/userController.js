const UserService = require('../../service/admin/userService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')
const { hashPassword, comparePassword } = require('../../utils/encryptPassword')
const { v4: uuidv4 } = require('uuid')

const UserController = {
    // 登录
    login: async (req, res) => {
        // 从数据库读取用户信息
        const user = await UserService.login(req.body)
        if (!user) {
            res.status(404).send({
                message: '没有此用户',
            })
        } else {
            // 校验密码
            const { password } = req.body
            const result = await comparePassword(password, user.password)
            // 如果result为false，则密码错误
            if (!result) {
                res.status(401).send({ message: '密码错误' })
            } else {
                // 设置token
                const token = JWT.generate(
                    {
                        id: user.id,
                        username: user.username,
                    },
                    '1h'
                )
                // 放在请求头中返回给前端
                res.header('Authorization', token)
                res.status(200).send({
                    message: '登录成功',
                    data: {
                        username: user.username,
                        role: user.role,
                        gender: user.gender,
                        avatar: user.avatar,
                        introduction: user.introduction,
                    },
                })
            }
        }
    },

    // 更新信息，上传文件
    upload: async (req, res) => {
        // 把用户信息解构出来
        const { username, gender, introduction, oldAvatar } = req.body
        let avatar
        if (!req.file) {
            // 如果没有上传文件，头像使用旧头像地址
            avatar = oldAvatar
        } else {
            // 如果更改了头像,即有文件上传
            // 头像地址
            avatar = `http://localhost:3000/images/avatars/${req.file.filename}`
            // 删除原来的头像
            deleteAvatar(oldAvatar)
        }
        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // console.log(origin)

        // 传到service层
        const result = await UserService.upload({
            id: origin.id,
            username,
            gender: Number(gender),
            introduction,
            avatar,
        })
        // console.log(result)
        if (result[0] === 1) {
            res.status(200).send({
                message: '用户信息更新成功',
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                    avatar,
                },
            })
        } else {
            res.status(400).send({ message: '用户信息更新失败' })
        }
    },

    // 修改密码
    changePass: async (req, res) => {
        // console.log(req.body)
        // 把数据解构出来
        const { oldPassword, newPassword } = req.body

        // 用token获取id
        const token = req.headers['authorization'].split(' ')[1]
        const origin = JWT.verify(token)
        // 从数据库读取用户信息
        const user = await UserService.getInfo({ id: origin.id })
        // 密码对比
        const isRight = await comparePassword(oldPassword, user.password)
        // isRight为false，则原密码错误
        if (!isRight) {
            res.status(400).send({ message: '原密码错误' })
        } else {
            // 对新密码加密
            const password = await hashPassword(newPassword)
            // 传到service层
            const result = await UserService.changePass({
                id: origin.id,
                password,
            })
            if (result[0] === 1) {
                res.status(200).send({
                    message: '密码更新成功',
                })
            } else {
                res.status(400).send({ message: '密码更新失败' })
            }
        }
    },

    // 添加用户
    add: async (req, res) => {
        // 从数据库读取用户信息
        const user = await UserService.login(req.body)
        // 如果用户不存在，则可以存入信息
        if (!user) {
            // 把用户信息解构出来
            let { username, password, gender, role, introduction } = req.body
            // 获取头像
            let avatar
            if (!req.file) {
                // 如果没有上传文件
                avatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            } else {
                // 如果更改了头像,即有文件上传
                // 头像地址
                avatar = `http://localhost:3000/images/avatars/${req.file.filename}`
                // 删除原来的头像
                deleteAvatar('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
            }
            // 对密码加密
            password = await hashPassword(password)
            // 生成uuid
            const id = uuidv4()
            // 生成时间戳
            const createTime = Date.now()
            try {
                // 传到service层
                const result = await UserService.add({
                    id,
                    username,
                    password,
                    role: Number(role),
                    gender: Number(gender),
                    introduction,
                    avatar,
                    createTime,
                })
                res.status(201).send({
                    message: '用户添加成功',
                })
            } catch (error) {
                res.status(500).send({ message: '用户添加失败' })
            }
        } else {
            res.status(409).send({ message: '用户已存在' })
        }
    },

    // 获取用户信息
    getList: async (req, res) => {
        try {
            const list = await UserService.getList(req.params)
            res.status(200).send({
                message: req.params.id ? '获取用户信息成功' : '获取用户列表成功',
                data: list,
            })
        } catch (err) {
            res.status(500).send({
                message: req.params.id ? '获取用户信息失败' : '获取用户列表失败',
                error: err.message,
            })
        }
    },

    // 删除用户
    delList: async (req, res) => {
        // console.log(req.params.id)
        // console.log(req.body)
        const result = await UserService.delList(req.params)
        if (result === 1) {
            // 删除头像
            deleteAvatar(req.body.avatar)
            res.status(200).send({
                message: '删除成功',
            })
        } else {
            res.status(400).send({
                message: '删除失败',
            })
        }
    },

    // 编辑用户
    putList: async (req, res) => {
        // 把数据解构出来
        const { id, username, password, role, introduction } = req.body
        let newData = {
            id,
            username,
            role,
            introduction,
        }
        if (password) {
            // 对密码加密
            const hashedPassword = await hashPassword(password)
            newData.password = hashedPassword
        }
        const result = await UserService.putList(newData)
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

module.exports = UserController

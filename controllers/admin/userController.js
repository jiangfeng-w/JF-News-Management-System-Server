const { and } = require('sequelize')
const UserService = require('../../service/admin/userService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')
const { hashPassword, comparePassword } = require('../../utils/encryptPassword')

const UserController = {
    // 登录
    login: async (req, res, next) => {
        // 从数据库读取用户信息
        const user = await UserService.login(req.body)
        if (!user) {
            res.status(404).send({
                error: '没有此用户',
            })
        } else {
            // 校验密码
            const { password } = req.body
            const result = await comparePassword(password, user.password)
            // 如果result为false，则密码错误
            if (!result) {
                res.status(401).send({ error: '密码错误' })
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
                    // result,
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
    upload: async (req, res, next) => {
        // 把用户信息解构出来
        const { username, gender, introduction, oldAvatar } = req.body
        let avatar
        if (!req.file) {
            // 如果没有上传文件，头像使用旧头像地址
            avatar = oldAvatar
        } else {
            // 如果更改了头像,即有文件上传
            // 头像地址
            avatar = `http://localhost:3000/avatars/${req.file.filename}`
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
            res.status(400).send({ error: '用户信息更新失败' })
        }
    },

    // 修改密码
    changePass: async (req, res, next) => {
        // console.log(req.body)
        // 把数据解构出来
        const { oldPassword, newPassword } = req.body

        // 从数据库读取用户信息
        const user = await UserService.login(req.body)
        // 密码对比
        const isRight = await comparePassword(oldPassword, user.password)
        // isRight为false，则原密码错误
        if (!isRight) {
            res.status(400).send({ error: '原密码错误' })
        } else {
            // 对新密码加密
            const password = await hashPassword(newPassword)
            // 传到service层
            const result = await UserService.changePass({
                id: user.id,
                password,
            })
            if (result[0] === 1) {
                res.status(200).send({
                    message: '密码更新成功',
                })
            } else {
                res.status(400).send({ error: '密码更新失败' })
            }
        }
    },

    // 添加用户
    add: async (req, res, next) => {
        // 从数据库读取用户信息
        const user = await UserService.login(req.body)
        // 如果用户不存在，则存入信息
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
                avatar = `http://localhost:3000/avatars/${req.file.filename}`
                // 删除原来的头像
                deleteAvatar('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
            }
            // 对密码加密
            password = await hashPassword(password)

            try {
                // 传到service层
                await UserService.add({
                    username,
                    password,
                    role: Number(role),
                    gender: Number(gender),
                    introduction,
                    avatar,
                })

                res.status(201).send({
                    message: '用户添加成功',
                })
            } catch (error) {
                res.status(500).send({ error: '用户添加失败' })
            }
        } else {
            res.status(409).send({ error: '用户已存在' })
        }
    },
}

module.exports = UserController

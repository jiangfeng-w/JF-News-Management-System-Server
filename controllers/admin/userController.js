const UserService = require('../../service/admin/userService')
const JWT = require('../../utils/JWT')
const deleteAvatar = require('../../utils/deleteAvatar')

const UserController = {
    // 登录
    login: async (req, res, next) => {
        try {
            // console.log(req.body)
            const result = await UserService.login(req.body)
            // res.json(users)
            if (!result) {
                res.send({
                    // result,
                    code: '-1',
                    error: '用户名或密码错误',
                })
            } else {
                // 设置token
                const token = JWT.generate(
                    {
                        id: result.id,
                        username: result.username,
                    },
                    '10h'
                )
                // 放在请求头中返回给前端
                res.header('Authorization', token)
                res.send({
                    // result,
                    ActionType: 'OK',
                    data: {
                        username: result.username,
                        role: result.role,
                        gender: result.gender,
                        avatar: result.avatar,
                        introduction: result.introduction,
                    },
                })
            }
        } catch (error) {
            next(error)
        }
    },

    // 上传文件
    upload: async (req, res, next) => {
        console.log(
            '-------------------------------------------------------------------------------------------------------'
        )
        console.log(req.body)
        console.log(req.file)
        // 把用户信息解构出来
        const { username, gender, introduction, oldAvatar } = req.body
        let avatar
        if (!req.file) {
            // 如果没有上传文件
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
        if (result.length === 1) {
            res.status(200).send({
                ActionType: 'OK',
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                    avatar,
                },
            })
        } else {
            res.status(500).send('用户信息更新失败')
        }
    },
}

module.exports = UserController

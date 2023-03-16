const UserService = require('../../service/admin/userService')

const UserController = {
    login: async (req, res, next) => {
        try {
            console.log(req.body)
            const result = await UserService.login(req.body)
            // res.json(users)
            if (!result) {
                res.send({
                    // result,
                    code: '-1',
                    error: '用户名或密码错误',
                })
            } else {
                res.send({
                    // result,
                    ActionType: 'OK',
                })
            }
        } catch (error) {
            next(error)
        }
    },
}

module.exports = UserController

const { where } = require('sequelize')
const UserModel = require('../../models/userModel')

const UserService = {
    // 登录，用用户名获取信息
    login: async ({ username }) => {
        return UserModel.findOne({
            where: {
                username,
            },
        })
    },
    // 更新用户信息
    upload: async ({ id, username, gender, introduction, avatar }) => {
        return UserModel.update({ username, gender, introduction, avatar }, { where: { id } })
    },
    // 添加用户
    add: async ({ id, username, password, role, gender, introduction, avatar, createTime }) => {
        return UserModel.create({ id, username, password, role, gender, introduction, avatar, createTime })
    },
    // 用id获取信息
    getInfo: async ({ id }) => {
        return UserModel.findOne({
            where: {
                id,
            },
        })
    },
    // 更改密码
    changePass: async ({ id, password }) => {
        return UserModel.update({ password }, { where: { id } })
    },
    // 获取用户列表
    getList: async ({ id }) => {
        if (id) {
            return UserModel.findOne({
                where: {
                    id,
                },
                attributes: { exclude: ['password', 'avatar', 'gender'] },
            })
        } else {
            return UserModel.findAll({
                attributes: { exclude: ['password', 'gender'] },
            })
        }
    },
    // 删除用户
    delList: async ({ id }) => {
        return UserModel.destroy({
            where: {
                id,
            },
        })
    },
    // 更新用户信息
    putList: async newData => {
        return UserModel.update(newData, { where: { id: newData.id } })
    },
}

module.exports = UserService

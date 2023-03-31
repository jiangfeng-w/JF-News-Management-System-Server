const { where } = require('sequelize')
const UserModel = require('../../models/userModel')

const UserService = {
    login: async ({ username }) => {
        return UserModel.findOne({
            where: {
                username,
            },
        })
    },
    upload: async ({ id, username, gender, introduction, avatar }) => {
        return UserModel.update({ username, gender, introduction, avatar }, { where: { id } })
    },
    add: async ({ username, password, role, gender, introduction, avatar }) => {
        return UserModel.create({ username, password, role, gender, introduction, avatar })
    },
    changePass: async ({ id, password }) => {
        return UserModel.update({ password }, { where: { id } })
    },
}

module.exports = UserService

const { where } = require('sequelize')
const UserModel = require('../../models/userModel')

const UserService = {
    login: async ({ username, password }) => {
        return UserModel.findOne({
            where: {
                username,
                password,
            },
        })
    },
    upload: async ({ id, username, gender, introduction, avatar }) => {
        return UserModel.update({ username, gender, introduction, avatar }, { where: { id } })
    },
}

module.exports = UserService

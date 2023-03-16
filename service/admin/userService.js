const { where } = require('sequelize')
const userModel = require('../../models/userModel')

const UserService = {
    login: async ({ username, password }) => {
        return userModel.findOne({
            where: {
                username,
                password,
            },
        })
    },
}

module.exports = UserService

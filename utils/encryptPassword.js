const bcrypt = require('bcrypt')

/**
 * 对密码进行加密
 * @param {string} password - 需要加密的密码
 * @returns {Promise<string>} 返回加密后的密码
 */
const hashPassword = async password => {
    const saltRounds = 10 // 加盐轮数
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

/**
 * 比较明文密码与加密密码是否匹配
 * @param {string} password - 明文密码
 * @param {string} hashedPassword - 加密后的密码
 * @returns {Promise<boolean>} 返回匹配结果
 */
const comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}

module.exports = {
    hashPassword,
    comparePassword,
}

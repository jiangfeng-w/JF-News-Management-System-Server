const jsonwebtoken = require('jsonwebtoken')
// 密钥
const secret = "Jiang Feng's Project"
const JWT = {
    // 生成token
    generate(value, expired) {
        return jsonwebtoken.sign(value, secret, { expiresIn: expired })
    },
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (error) {
            return false
        }
    },
}

module.exports = JWT

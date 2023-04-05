// 删除头像
const fs = require('fs')
const path = require('path')

const deleteAvatar = avatarURL => {
    if (avatarURL === 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png') {
        return
    }
    const filename = avatarURL.substring(avatarURL.lastIndexOf('/') + 1)
    const filePath = path.join(__dirname, '../public/images/avatars/', filename).replace(/\//g, '\\')
    fs.unlink(filePath, err => {
        if (err) throw err
        // console.log('删除成功')
    })
}

module.exports = deleteAvatar

// 删除新闻封面
const fs = require('fs')
const path = require('path')

const deleteAvatar = avatarURL => {
    const filename = avatarURL.substring(avatarURL.lastIndexOf('/') + 1)
    const filePath = path.join(__dirname, '../public/images/newsCover/', filename).replace(/\//g, '\\')
    fs.unlink(filePath, err => {
        if (err) throw err
        console.log('删除成功')
    })
}

module.exports = deleteAvatar

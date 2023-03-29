var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const userRouter = require('./routes/admin/userRouter')
const JWT = require('./utils/JWT')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// /admin: 后台管理接口
// /web: 前台页面接口

// token情况处理
app.use((req, res, next) => {
    // 如果还未登录，不用处理
    if (req.url === '/admin/user/login') {
        next()
        return
    }
    // 已经登录
    // 获取token
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
        const origin = JWT.verify(token)
        // console.log(origin)
        if (!origin) {
            // token过期
            res.status(401).send({ errCode: '-1', errorInfo: 'token过期' })
        } else {
            // token未过期
            // 生成新token
            const newToken = JWT.generate({ id: origin.id, username: origin.username }, '10h')
            // 放在请求头中返回给前端
            res.header('Authorization', newToken)
            next()
        }
    }
})

app.use(userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app

var express = require('express')
var path = require('path')
var bodyparser = require('body-parser')
var mount = require('mount-routes')
var app = express()
/**
 * 公共系统初始化
 */
//设置秘钥
app.set('secret', 'i2u34y12oi3u4y8')
app.use(
	bodyparser.urlencoded({
		extended: true,
	})
)
app.use(bodyparser.json())
//初始化数据库
require('./config/db')(app)
// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, Authorization'
	)
	res.setHeader('Content-Type', 'application/json;charset=utf-8')
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
	)
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	res.header('X-Powered-By', ' 3.2.1')
	if (req.method == 'OPTIONS') res.send(200)
	/*让options请求快速返回*/ else next()
})
// 初始化统一响应机制
var resextra = require('./modules/resextra.js')
app.use(resextra)
//初始化路由
mount(app, path.join(process.cwd(), '/routes'), true)

// const authMiddleware = require('./middleware/auth')
// app.use(authMiddleware)
// 允许访问静态资源
app.use('/tmp_uploads', express.static('tmp_uploads'))
app.use('/uploads', express.static('uploads'))
app.listen(3000, async (req, res) => {
	console.log('http://localhost:3000')
})
module.exports = app

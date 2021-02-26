var express = require('express')
var router = express.Router()
var path = require('path')
const jwt = require('jsonwebtoken')
const User = require('../../../../models/User')
var secret = require('../../../../config/secret')
// 用户登录
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	console.log(username)
	const user = await User.findOne({ username }).select('+password')
	if (!user) {
		return res.sendResult(null, 400, '用户名不存在')
	}
	// 2.校验密码
	const isValid = require('bcryptjs').compareSync(password, user.password)
	if (!isValid) {
		return res.sendResult(null, 400, '密码错误')
	}
	// // 3.返回token
	const token = jwt.sign({ id: user._id }, secret.getSecret())
	// 重新封装数据
	var obj = {
		token: token,
	}
	const newUser = Object.assign(obj, user._doc)
	console.log(newUser)
	res.sendResult(newUser, 200, '登录成功')
})
// 用户注册
router.post('/register', (req, res) => {
	const ID_card_number = req.body.ID_card_number
	if (!ID_card_number) {
		return res.sendResult(null, 400, '非法注册')
	}
	User.findOne({ ID_card_number }, async function (err, doc) {
		if (err) throw err
		if (doc) {
			return res.sendResult(null, 400, '该用户已注册')
		}
		const model = await User.create(req.body)
		console.log(model)
		if (!model) {
			return res.sendResult(null, 400, '注册失败')
		}
		res.sendResult(model, 201, '注册成功')
	})
})
module.exports = router

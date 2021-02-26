var express = require('express')
var router = express.Router()
var path = require('path')
var mongoose = require('mongoose')
var Menus = mongoose.model('Menus')
/**
 *  获取菜单列表
 */

router.get('', (req, res) => {
	Menus.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		res.sendResult(doc, 200, '获取菜单列表成功')
	})
})
/**
 * 仅编辑菜单使用
 */
// router.post('/add', (req, res) => {
// 	console.log(req.body)
// 	const model = Menus.create(req.body)
// 	console.log(model)
// 	res.sendResult(doc, 200, '获取列表成功')
// })
module.exports = router

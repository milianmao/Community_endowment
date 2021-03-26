var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Order = mongoose.model('Order')

// 获取服务工单列表
router.get('/list', (req, res) => {
	Order.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		res.sendResult(doc, 200, '获取列表成功')
	})
})

// 添加服务工单
router.post('/', (req, res) => {
	const model = Order.create(req.body)
	if (!model) return res.sendResult(null, 400, '添加失败')
	res.sendResult(model, 201, '添加成功')
})

// 修改工单状态
router.put('/:id', (req, res) => {})
module.exports = router

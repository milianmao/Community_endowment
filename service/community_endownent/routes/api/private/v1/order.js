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
	if (!model) return res.sendResult(null, 400, '请求失败')
	res.sendResult(model, 201, '请求成功')
})

// 修改工单状态
router.put('/:id', (req, res) => {
	console.log(req.body)
	const _id = mongoose.Types.ObjectId(req.params.id)
	Order.updateOne({ _id }, req.body, function (err, doc) {
		console.log(doc)
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '信息不存在')
		}
		res.sendResult(null, 200, '修改成功')
	})
})

// 根据状态查询
router.get('/findByStatus', (req, res) => {
	let status = req.query.status
	Order.find({ status }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		if (doc.length) {
			return res.sendResult(doc, 200, '查询成功')
		} else {
			return res.sendResult(null, 200, '结果为空')
		}
	})
})
// 查询工单信息
router.get('/sreach', (req, res) => {
	console.log(req.query.sreachKey)
	let sreachKey = new RegExp(req.query.sreachKey, 'i')
	Order.find(
		{
			$or: [
				// 多条件查询，数组
				{ real_name: { $regex: sreachKey } },
				{ home_address: { $regex: sreachKey } },
			],
		},
		function (err, doc) {
			if (err) {
				res.sendResult(null, 400, '服务器内部错误')
				throw err
			}
			if (doc.length) {
				return res.sendResult(doc, 200, '查询成功')
			} else {
				return res.sendResult(null, 200, '结果为空')
			}
		}
	)
})

// 删除工单
router.delete('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	Order.deleteOne({ _id }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '信息不存在，删除失败')
		}
		res.sendResult(null, 200, '删除成功')
	})
})
module.exports = router

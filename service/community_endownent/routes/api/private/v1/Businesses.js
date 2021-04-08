var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Businesses = mongoose.model('Businesses')

// 获取服务商家列表
router.get('/list', (req, res) => {
	Businesses.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		res.sendResult(doc, 200, '获取列表成功')
	})
})
// 添加服务商家
router.post('/', (req, res) => {
	Businesses.find(
		{ $and: [{ name: req.body.name }, { address: req.body.address }] },
		function (err, doc) {
			if (err) {
				res.sendResult(null, 500, '服务器内部错误')
				throw err
			}
			console.log(doc)
			if (doc.length) {
				res.sendResult(null, 400, '.商家已存在')
			} else {
				const model = Businesses.create(req.body)
				if (!model) return res.sendResult(null, 400, '添加失败')
				res.sendResult(model, 201, '添加成功')
			}
		}
	)
})
// 修改服务商家信息
router.put('/:id', (req, res) => {
	console.log(req.body)
	const _id = mongoose.Types.ObjectId(req.params.id)
	Businesses.updateOne({ _id }, req.body, function (err, doc) {
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

// 查询服务商家信息
router.get('/sreach', (req, res) => {
	console.log(req.query.sreachKey)
	let sreachKey = new RegExp(req.query.sreachKey, 'i')
	Businesses.find(
		{
			$or: [
				// 多条件查询，数组
				{ name: { $regex: sreachKey } },
				{ address: { $regex: sreachKey } },
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

router.delete('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	Businesses.deleteOne({ _id }, function (err, doc) {
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

var express = require('express')
var router = express.Router()
var path = require('path')
var mongoose = require('mongoose')
var HealthInfo = mongoose.model('HealthInfo')
/**
 * 老人健康信息
 */

// 添加老人健康信息
router.post('/add', (req, res) => {
	const ID_card_number = req.body.ID_card_number
	// 查询老人信息是否存在
	console.log(ID_card_number)
	HealthInfo.findOne({ ID_card_number }, async function (err, doc) {
		if (err) throw err
		if (doc) {
			return res.sendResult(null, 400, '老人健康信息已存在')
		}
		const model = await HealthInfo.create(req.body)
		if (!model) {
			return res.sendResult(null, 400, '添加失败')
		}
		res.sendResult(model, 201, '添加成功')
	})
})
// 获取老人健康信息列表
router.get('/list', (req, res) => {
	HealthInfo.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		res.sendResult(doc, 200, '获取列表成功')
	})
})
// 编辑老人健康信息
router.put('/:id', (req, res) => {
	console.log(req.params.id)
	const _id = mongoose.Types.ObjectId(req.params.id)
	console.log('1')
	HealthInfo.updateOne({ _id }, req.body, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '老人健康信息不存在')
		}
		res.sendResult(null, 200, '修改成功')
	})
})
// 删除老人健康信息
router.delete('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	HealthInfo.deleteOne({ _id }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '老人健康信息不存在，删除失败')
		}
		res.sendResult(null, 200, '删除成功')
	})
})
// 查询老人健康信息
router.get('/sreach', (req, res) => {
	let sreachKey = new RegExp(req.query.sreachKey, 'i')
	HealthInfo.find(
		{
			$or: [
				// 多条件查询，数组
				{ real_name: { $regex: sreachKey } },
				{ ID_card_number: { $regex: sreachKey } },
				{ male: { $regex: sreachKey } },
			],
		},
		function (err, doc) {
			console.log(doc)
			if (err) {
				res.sendResult(null, 500, '服务器内部错误')
				throw err
			}
			if (doc.length) {
				return res.sendResult(doc, 200, '查询成功')
			} else {
				return res.sendResult(null, 400, '结果为空')
			}
		}
	)
})
module.exports = router

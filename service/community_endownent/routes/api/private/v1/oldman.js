var express = require('express')
var router = express.Router()
var path = require('path')
var mongoose = require('mongoose')
var OldManInfo = mongoose.model('OldManInfo')
/**
 * 老人信息
 */

// 添加老人信息
router.post('/add', (req, res) => {
	const ID_card_number = req.body.ID_card_number
	// 查询老人信息是否存在
	console.log(ID_card_number)
	OldManInfo.findOne({ ID_card_number }, async function (err, doc) {
		if (err) throw err
		if (doc) {
			return res.sendResult(null, 400, '老人已存在')
		}
		const model = await OldManInfo.create(req.body)
		if (!model) {
			return res.sendResult(null, 400, '添加失败')
		}
		res.sendResult(model, 201, '添加成功')
	})
})
// 获取老人信息列表
router.get('/list', (req, res) => {
	OldManInfo.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		res.sendResult(doc, 200, '获取列表成功')
	})
})
// 编辑老人信息
router.put('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	OldManInfo.updateOne({ _id }, req.body, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '老人信息不存在')
		}
		res.sendResult(null, 200, '修改成功')
	})
})
// 删除老人信息
router.delete('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	OldManInfo.deleteOne({ _id }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '老人信息不存在，删除失败')
		}
		res.sendResult(null, 200, '删除成功')
	})
})
// 查询老人信息 支持模糊查询
router.get('/sreach', (req, res) => {
	console.log(req)
	let sreachKey = new RegExp(req.query.sreachKey, 'i')
	OldManInfo.find(
		{
			$or: [
				// 多条件查询，数组
				{ rel_name: { $regex: sreachKey } },
				{ ID_card_number: { $regex: sreachKey } },
			],
		},
		function (err, doc) {
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

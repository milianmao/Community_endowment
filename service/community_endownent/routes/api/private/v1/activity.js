var express = require('express')
var router = express.Router()
var path = require('path')
var mongoose = require('mongoose')
var ActivityInfo = mongoose.model('ActivityInfo')
var ImageProcessing = require(path.join(
	process.cwd(),
	'modules/ImageProcessing'
))
/**
 * 社区活动信息
 */
// 获取社区活动信息
router.get('/', (req, res) => {
	ActivityInfo.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		res.sendResult(doc, 200, '获取列表成功')
	})
})
//  添加社区活动信息
router.post('/', async (req, res) => {
	const data = ImageProcessing(req.body)
	const model = await ActivityInfo.create(data)
	if (!model) {
		return res.sendResult(null, 400, '添加失败')
	}
	res.sendResult(model, 201, '添加成功')
})
// 编辑社区活动信息
router.put('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	ActivityInfo.updateOne({ _id }, req.body, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '活动信息不存在')
		}
		console.log(doc)
		res.sendResult(null, 200, '修改成功')
	})
})
// 删除社区活动信息
router.delete('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	ActivityInfo.deleteOne({ _id }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '活动信息不存在，删除失败')
		}
		res.sendResult(null, 200, '删除成功')
	})
})
// 查询社区活动信息
router.get('/find/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	ActivityInfo.findOne({ _id }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc) {
			return res.sendResult(null, 400, '活动信息不存在')
		}
		console.log(doc)
		res.sendResult(doc, 200, '查询成功')
	})
})
// 模糊查询
router.get('/sreach', (req, res) => {
	let sreachKey = new RegExp(req.query.sreachKey, 'i')
	ActivityInfo.find({ act_name: { $regex: sreachKey } }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		if (doc.length) {
			return res.sendResult(doc, 200, '查询成功')
		} else {
			return res.sendResult(null, 400, '结果为空')
		}
	})
})
module.exports = router

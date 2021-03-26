const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const ServicePersonnel = mongoose.model('ServicePersonnel')

/**
 * 获取社区服务人员列表
 */

router.get('/', (req, res) => {
	ServicePersonnel.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc.length)
		if (!doc.length) {
			return res.sendResult(null, 400, '暂无信息')
		}
		res.sendResult(doc, 200, '获取成功')
	})
})
router.post('/', (req, res) => {
	const sp_ID_card = req.body.sp_ID_card
	// 查询服务人员信息是否存在
	console.log(sp_ID_card)
	ServicePersonnel.findOne({ sp_ID_card }, async function (err, doc) {
		if (err) throw err
		if (doc) {
			return res.sendResult(null, 400, '服务人员已存在')
		}
		const model = await ServicePersonnel.create(req.body)
		if (!model) {
			return res.sendResult(null, 400, '添加失败')
		}
		res.sendResult(model, 201, '添加成功')
	})
})
router.put('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	ServicePersonnel.updateOne({ _id }, req.body, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}

		if (!doc.n) {
			return res.sendResult(null, 400, '服务人员信息不存在')
		}
		res.sendResult(null, 200, '修改成功')
	})
})

router.delete('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	ServicePersonnel.deleteOne({ _id }, function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		if (!doc.n) {
			return res.sendResult(null, 400, '服务信息不存在，删除失败')
		}
		res.sendResult(null, 200, '删除成功')
	})
})
// 查询社区服务人员
router.get('/sreach', (req, res) => {
	let sreachKey = new RegExp(req.query.sreachKey, 'i')
	ServicePersonnel.find(
		{
			$or: [
				// 多条件查询，数组
				{ sp_name: { $regex: sreachKey } },
				{ sp_ID_card: { $regex: sreachKey } },
				{ sp_male: { $regex: sreachKey } },
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

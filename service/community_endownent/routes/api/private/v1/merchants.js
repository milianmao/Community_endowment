var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

const Merchants = mongoose.model('Merchants')

router.get('/', (req, res) => {
	Merchants.find(function (err, doc) {
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

	console.log(sp_ID_card)
	Merchants.findOne({ sp_ID_card }, async function (err, doc) {
		if (err) throw err
		if (doc) {
			return res.sendResult(null, 400, '服务人员已存在')
		}
		const model = await Merchants.create(req.body)
		if (!model) {
			return res.sendResult(null, 400, '添加失败')
		}
		res.sendResult(model, 201, '添加成功')
	})
})
router.put('/:id', (req, res) => {
	const _id = mongoose.Types.ObjectId(req.params.id)
	Merchants.updateOne({ _id }, req.body, function (err, doc) {
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
	Merchants.deleteOne({ _id }, function (err, doc) {
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

module.exports = router

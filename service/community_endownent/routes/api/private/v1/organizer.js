const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const ActivityInfo = mongoose.model('ActivityInfo')

/*
 * 获取活动人员列表
 * */
router.get('/', (req, res) => {
	ActivityInfo.find(function (err, doc) {
		if (err) {
			res.sendResult(null, 500, '服务器内部错误')
			throw err
		}
		console.log(doc)
		if (!doc.length) {
			return res.sendResult(null, 400, '暂无信息')
		}
		res.sendResult(doc, 200, '获取成功')
	})
})
module.exports = router

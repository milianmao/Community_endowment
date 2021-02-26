var fs = require('fs')
var path = require('path')
var Promise = require('bluebird')
var baseURL = 'http://127.0.0.1:3000'
function ImageProcessing(data) {
	data.act_pics.forEach((item) => {
		const srcPath = path.join(process.cwd(), '/' + item.act_pic)
		const savePath = path.join(
			process.cwd(),
			'/' + item.act_pic.replace(/tmp_uploads/, 'uploads')
		)
		console.log(item.act_pic.replace(/tmp_uploads/, 'uploads'))
		const url = path.join(
			baseURL,
			'/' + item.act_pic.replace(/tmp_uploads/, 'uploads')
		)
		clipImage(srcPath, savePath)
		console.log(url)
		item.act_pic = url.replace(/\\/g, '/')
	})
	return data
}

function clipImage(srcPath, savePath) {
	return new Promise(function (resolve, reject) {
		// 创建读取流
		readable = fs.createReadStream(srcPath)
		// 创建写入流
		writable = fs.createWriteStream(savePath)
		readable.pipe(writable)
		readable.on('end', function () {
			resolve()
		})
	})
}
module.exports = ImageProcessing

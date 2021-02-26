module.exports = (app) => {
	const mongoose = require('mongoose')
	mongoose.connect('mongodb://127.0.0.1:27017/Pension_management', {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	var db = mongoose.connection
	db.on('err', console.error.bind(console, 'connection error:'))
	db.once('open', function () {
		console.log('连接数据库成功')
	})
	require('require-all')(__dirname + '/../models')
}

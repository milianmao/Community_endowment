const mongoose = require('mongoose')
const Businesses = new mongoose.Schema({
	name: { type: String },
	address: { type: String },
	phone: { type: String },
	service_type: { type: String },
	service_time: { type: Number }, //服务次数
	service_record: { type: Array },
})
module.exports = mongoose.model('Businesses', Businesses)

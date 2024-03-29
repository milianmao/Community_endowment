const mongoose = require('mongoose')
const Order = new mongoose.Schema({
	real_name: { type: String },
	home_address: { type: String },
	post_type: { type: Number }, // 0:日常需求 1:药品需求 2:社会保障 3:投诉 4:建议
	msg_main: { type: String },
	msg_note: { type: String },
	status: { type: String, default: 0 }, // 0：未处理 1：处理中 2：已处理
})
module.exports = mongoose.model('Order', Order)

const mongoose = require('mongoose')
const Order = new mongoose.Schema({
	real_name: { type: String },
	add_address: { type: String },
	post_type: { type: Number },
	msg_main: { type: String },
	msg_note: { type: String },
	status: { type: String },
})
module.exports = mongoose.model('Order', Order)

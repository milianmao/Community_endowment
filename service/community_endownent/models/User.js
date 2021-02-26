const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = new mongoose.Schema({
	username: { type: String },
	password: {
		type: String,
		select: false,
		set(val) {
			return bcrypt.hashSync(val, 10)
		},
	},
	level_id: {
		type: Number,
		default: 0, //权限设置默认为0
	},
	rel_name: { type: String },
	ID_card_number: { type: String },
})
module.exports = mongoose.model('User', schema)

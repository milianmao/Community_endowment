const mongoose = require('mongoose')
const OldManInfo = new mongoose.Schema({
	rel_name: { type: String },
	male: { type: String },
	age: { type: Number },
	national: { type: String },
	ID_card_number: { type: String },
	home_address: { type: String },
	phone: { type: String },
})
module.exports = mongoose.model('OldManInfo', OldManInfo)

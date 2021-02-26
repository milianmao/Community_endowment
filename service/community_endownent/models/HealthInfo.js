const mongoose = require('mongoose')
const HealthInfo = new mongoose.Schema({
	real_name: { type: String },
	male: { type: String },
	age: { type: Number },
	om_height: { type: Number },
	om_weight: { type: Number },
	illness: { type: Array },
	drug: { type: Array },
	ID_card_number: { type: String },
})
module.exports = mongoose.model('HealthInfo', HealthInfo)

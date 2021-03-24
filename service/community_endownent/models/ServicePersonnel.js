const mongoose = require('mongoose')
const ServicePersonnel = new mongoose.Schema({
	sp_name: { type: String },
	sp_age: { type: String },
	sp_male: { type: String },
	sp_ID_card: { type: String },
	sp_phone: { type: String },
	sp_group: { type: String },
	sp_lead: { type: Number }, // 0代表服务小组组员，1代表服务小组组长
})

module.exports = mongoose.model('ServicePersonnel', ServicePersonnel)

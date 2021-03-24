const mongoose = require('mongoose')
const Merchants = new mongoose.Schema({
	mc_name: { type: String },
	mc_type: { type: String },
	mc_phone: { type: String },
	mc_address: { type: String },
})

module.exports = mongoose.model('Merchants', Merchants)

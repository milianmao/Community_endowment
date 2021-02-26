const mongoose = require('mongoose')
const ActivityInfo = new mongoose.Schema(
	{
		act_name: { type: String },
		act_des: { type: String },
		act_status: { type: Number, default: '0' },
		act_time: { type: Array },
		act_address: { type: String },
		act_pics: { type: Array },
		act_organizers: { type: Array },
	},
	{ timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)
module.exports = mongoose.model('ActivityInfo', ActivityInfo)

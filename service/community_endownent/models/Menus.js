const mongoose = require('mongoose')
const SubMenus = new mongoose.Schema({
	path: { type: String },
	authName: { type: String },
})
const Menus = new mongoose.Schema({
	icon: { type: String },
	authName: { type: String },
	children: [SubMenus],
})
module.exports = mongoose.model('Menus', Menus)

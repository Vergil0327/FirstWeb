var mongoose = require('mongoose');

//Schema Setup
var citySchema = new mongoose.Schema({
	name: String,
	image: String,
	photographer: String,
	_from: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment" //ref -> Comment model
		}
	]
});
//Model Setup & exports
module.exports = mongoose.model("city", citySchema);
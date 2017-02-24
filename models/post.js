var mongoose = require('mongoose');

//Schema Setup
var postSchema = new mongoose.Schema({
	title: String,
	text: String,
	date: {
		type: Date,
		default: new Date
	},
	author: {
		username: String,
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	}
});

module.exports = mongoose.model("post", postSchema);


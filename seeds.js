/*  Error Driven Development */

var mongoose = require('mongoose'),
	City = require('./models/city'),
	Comment = require('./models/comment'),
	Post    = require('./models/post');

var data = [
	{
		title: "Test_1",
		text: "Test_1",
		tag: "Type_1"
	},
	{
		title: "Test_2",
		text: "Test_2",
		tag: "Type_2"
	},
	{
		title: "Test_3",
		text: "Test_3",
		tag: "test"
	},
];

// function seedDB(){
// 	//Remove all cities
// 	City.remove({}, function(err){
		// if(err) {
		// 	console.log(err);
		// } else {
		// 	console.log("removed citys!");
		// 	//add a few cities
		// 	data.forEach(function(seed){
		// 		City.create(seed, function(err, city){
		// 			if(err) {
		// 				console.log(err);
		// 			}else {
		// 				console.log("added a city");
		// 				//create a few comments
		// 				Comment.create(
		// 					{
		// 						text: "This place is great! I wish I were there",
		// 						author: "Anonymous"
		// 					}, function(err, comment){
		// 						if(err) {
		// 							console.log(err);
		// 						}else {
		// 							city.comments.push(comment);
		// 							city.save();
		// 							console.log("Created new comment");
		// 						}
		// 					}
		// 				);
		// 			}
		// 		});
		// 	});
		// }
// 	});
	
// }

function seedDB(){
	Post.remove({}, function(err){
		if(err) {
			console.log(err);
		}else {
			data.forEach(function(seed){
				Post.create(seed, function(err, post){
					if(err) {
						console.log(err);
					}else {
						console.log("add a post");
					};
				})
			});
		}
	});	
}
// export as a function so we can call it in app.js
module.exports = seedDB;
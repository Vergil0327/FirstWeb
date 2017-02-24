/*  Error Driven Development */
/*
Every time when I start server, 
seed.js will remove all data and add some sample data to work with in order to check if any errors occur*/

var mongoose = require('mongoose'),
	City = require('./models/city'),
	Comment = require('./models/comment'),
	Post    = require('./models/post');

// var data = [
// 	{
// 		name: "Taipei",
// 		image: "https://farm1.staticflickr.com/444/19472808621_b37c3e99e9.jpg",
// 		photographer: "i.gunawan",
// 		_from: "https://www.flickr.com/photos/38094265@N07/23494318805/",
// 		description: "Capital of Taiwan - Taipei, officially known as Taipei City, is the capital city and a special municipality of the Republic of China (commonly known as Taiwan). Sitting at the northern tip of the island, Taipei City is an enclave of the municipality of New Taipei City. It is about 25 km (16 mi) southwest of the northern port city Keelung. Most of the city is located on the Taipei Basin, an ancient lakebed bounded by the two relatively narrow valleys of the Keelung and Xindian rivers, which join to form the Tamsui River along the city's western border. Since 1949, Taipei has been the capital of the ROC after losing the mainland to the Communists in the Chinese Civil War."
// 	},
// 	{
// 		name: "Kaohsiung",
// 		image: "https://farm8.staticflickr.com/7229/7402026096_c129f81583.jpg",
// 		photographer: "neverbutterfly",
// 		_from: "https://www.flickr.com/photos/7451276@N08/7402026096/",
// 		description: "Happiness City - Kaohsiung City (old names: Takao, Takow, Takau) is a special municipality in Taiwan. Located in southern-western Taiwan and facing the Taiwan Strait, it is by area the largest municipality, at 2,951.85 km2 (1,139.72 sq mi), stretches from Mt. Jade to Taiping Island, and second most populous (by city proper) with a population of approximately 2.77 million. Since its start in the 17th century, Kaohsiung has grown from a small trading village, into the political, economic, transportation, manufacturing, refining, shipbuilding, and industrial center of southern Taiwan. It is a global city with sufficiency as categorized by Globalization and World Cities Research Network in 2012."
// 	},
// 	{
// 		name: "Taichung",
// 		image: "https://farm9.staticflickr.com/8084/8398897628_3227f1dda6.jpg",
// 		photographer: "billy1125",
// 		_from: "https://www.flickr.com/photos/10209478@N03/14903877069/",
// 		description: "My Sweet Hometown - Taichung, officially known as Taichung City is a special municipality located in center-western Taiwan. Taichung has a population of over 2.7 million people, making it the third largest city on the island after New Taipei City and Kaohsiung. On 25 December 2010, Taichung County merged with the original provincial Taichung City to form the special municipality. The city's motto is 'economic, cultural and international city.'"
// 	},
// 	{
// 		name: "Tainan",
// 		image: "https://farm8.staticflickr.com/7609/16201310064_8d4f117115.jpg",
// 		photographer: "Alexander Synaptic",
// 		_from: "https://www.flickr.com/photos/95350998@N02/16201310064/",
// 		description: "Ancient Cultural Capital - Tainan, officially Tainan City is a special municipality located in southern Taiwan, Republic of China, facing the Taiwan Strait in the west and south. Tainan is the oldest city in Taiwan and also commonly known as the 'Capital City' (府城) for its over 200 years of history as the capital of Taiwan under Koxinga and later Qing dynasty rule. Tainan's complex history of comebacks, redefinitions and renewals inspired its popular nickname 'the Phoenix City'."
// 	}
// ];

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
		text: "Test_3 substring 方法傳回的字串將包含從 start 開始到 end 的子字串，但不包含後者本身。 substring 方法會使用 start 和 end 中較小的值做為子字串的起點。例如 strvar.substring(0, 3) 和 strvar.substring(3, 0) 會傳回相同的子字串。 如果 start 或 end 中的任何一個是 NaN 或負數，其值將會變成 0。 子字串的長度等於 start 和 end 二者之間差異的絕對值。例如，strvar.substring(0, 3) 和 strvar.substring(3, 0) 中所傳回的子字串長度都是 3。",
		tag: "Type_3"
	}
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
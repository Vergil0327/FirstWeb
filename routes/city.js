var express = require('express'),
	router  = express.Router();
var City    = require('../models/city');
var middleware = require('../middleware'); //!important: index.js is a special name, it'll auto find index.js and require it

//landing page
router.get("/landing", function(req, res){
	res.render("landing");
});


//Index Route - show all cities
router.get("/", function(req, res){
	//Get all cities from DB
	City.find({}, function(err, allCities){
		//if got errors, console.log err
		if(err) {
			console.log(err);
		//else, render all the file in cities collections to city.ejs
		}else {
			res.render("city/index", {cities: allCities}); //{"cities" in city.ejs = "allCities" in callback funciton"}
		}
	});
});

//Create Route - add new city to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and add to cities array
	var name = req.body.name;
	var img = req.body.image;
	var desc = req.body.description;
	// req.user will contain currently loggedin user{_id & username}
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCity = {name: name, image: img, description: desc, author: author};
	//Create a new city and save to DB
	City.create(newCity, function(err, newlyCreatedCity){
		if(err){
			console.log(err);
		} else{
			console.log(newlyCreatedCity); //check
			//redirect back to city page
			res.redirect("/city");
		}
	});
});

//New Route - show form to create new city
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("city/new");
});

//Show Route - show more info about one campground
router.get("/:id", function(req,res){
	/*
	Mongoose Method: 
	City.findById(id)                <find the city with provided ID>
	.populate('comments').exec(cb)   <fill in data of comments and execute callback fn>
	*/
	City.findById(req.params.id).populate('comments').exec(function(err, foundCity){
		if(err) {
			console.log(err);
		}else {
			//render show template with that city
			res.render("city/show", {city: foundCity});
		}
	}) ;
	
});

//Edit Route
router.get("/:id/edit", middleware.checkCityOwnership, function(req, res){
	// //is user logged in ? If not, redirect
	// if(req.isAuthenticated()) {
	// 	City.findById(req.params.id, function(err, foundCity){
	// 		if(err){
	// 			res.redirect("/city")
	// 		}else {
	// 			//does user own the city? (comapare user._id with city.author.id)
	// 			//if not, redirect ; else do things below
	// 				// console.log(foundCity.author.id);  //!important typeof: mongoose object
	// 				// console.log(req.user._id);         //!important typeof: string
	// 				//Thus, can't do things like this: if(foundCity.author.id ===/== req.user._id){...}
	// 				//Instead, we can use method from mongoose equals()
	// 			if(foundCity.author.id.equals(req.user._id)) {
	// 				res.render("city/edit", {city: foundCity});
	// 			} else {
	// 				// res.send("YOU DO NOT HAVE PERMISSION TO DO TAHT !");
	// 				res.redirect("back");
	// 			}
	// 		}
	// 	});
	// } else {
	// 	// res.send("You need to login first");
	// 	res.redirect("back");
	// }

	//another way to check permission/authorization
	// add middleware"checkCityOwnership" to router.get: router.get("/:id/edit", checkOwnership, function(err, foundCity){...})
	City.findById(req.params.id, function(err, foundCity){
		res.render("city/edit", {city: foundCity});
	});
});

//Update Route
router.put("/:id", middleware.checkCityOwnership, function(req, res){
	//find and update the correct city
	City.findByIdAndUpdate(req.params.id, req.body.city, function(err, updatedCity){
		if(err) {
			res.redirect("/city");
		}else {
			//redirect to show page
			res.redirect("/city/" + req.params.id);
		}
	} );
});

//DESTROY CITY ROUTE
router.delete("/:id", middleware.checkCityOwnership, function(req, res){
	City.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/city");
		} else {
			res.redirect("/city");
		}
	})
});


// //middleware - move to index.js in middleware directory
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCityOwnership(req, res, next){
// 	if(req.isAuthenticated()) {
// 		City.findById(req.params.id, function(err, foundCity){
// 			if(err){
// 				res.redirect("back");
// 			}else {
// 				//does user own the paragraph? (comapare user._id with city.author.id)
// 				//if not, redirect ; else next()
// 					// console.log(foundCity.author.id);  //!important typeof: mongoose object
// 					// console.log(req.user._id);         //!important typeof: string
// 					//Thus, can't do things like this: if(foundCity.author.id ===/== req.user._id){...}
// 					//Instead, we can use method from mongoose equals()
// 				if(foundCity.author.id.equals(req.user._id)) {
// 					next();
// 				} else {
// 					res.redirect("back");
// 				}
// 			}
// 		});
// 	} else {
// 		res.redirect("back");
// 	}
// }

module.exports = router;
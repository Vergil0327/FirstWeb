var express = require('express'),
	router  = express.Router();
var City    = require('../models/city');
var middleware = require('../middleware'); 

//landing page
router.get("/landing", function(req, res){
	res.render("landing");
});


//Index Route - show all 
router.get("/", function(req, res){
	//Get all from DB
	City.find({}, function(err, allCities){
		//if got errors, console.log err
		if(err) {
			console.log(err);
		//else, render all the file in db_collections
		}else {
			res.render("city/index", {cities: allCities}); 
		}
	});
});

//Create Route - add new one to DB
router.post("/", middleware.CheckWhoYouAre, function(req, res){
	// get data from form and add to array
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
			// console.log(newlyCreatedCity); //check
			//redirect back to city page
			res.redirect("/city");
		}
	});
});

//New Route - show form to create new city
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("city/new");
});

//Show Route - show more info
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
	City.findById(req.params.id, function(err, foundCity){
		res.render("city/edit", {city: foundCity});
	});
});

//Update Route
router.put("/:id", middleware.checkCityOwnership, function(req, res){
	find and update the correct city
	City.findByIdAndUpdate(req.params.id, req.body.city, function(err, updatedCity){
		if(err) {
			res.redirect("/city");
		}else {
			//redirect to show page
			res.redirect("/city/" + req.params.id);
		}
	} );

	/*Test promise*/
	// City.findByIdAndUpdate(req.params.id, req.body.city).then(function(err){if(err){res.redirect("/city");}else{res.redirect("/city/" + req.params.id);}});
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

module.exports = router;
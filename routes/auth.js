var express  = require('express'),
	passport = require('passport'),
	router   = express.Router();
var User     = require('../models/user');
var middleware = require('../middleware');

//==========================
//    CITY REGISTER ROUTE
//==========================
//show register form
router.get("/register", function(req, res){
	res.render("register");
});
//handle sign up logic
router.post("/register", middleware.checkUserExistence, function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + user.username);
			res.redirect("/city");
		});
	});
});

//==========================
//    CITY LOGIN ROUTE
//==========================
//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local", {
		successRedirect: "/city",
		failureRedirect: "/login"
	}), function(req, res){
});

//==========================
//    CITY LOGOUT ROUTE
//==========================
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You've been logged out, Bye ~");
	res.redirect("/city");
});

// --------------------------------
//HOMEPAGE LOGIN ROUTES
	//show login page
	router.get("/homepage/login", function(req,res){
		res.render("home/login");
	});
	//handle login logic
	router.post("/homepage/login", passport.authenticate("local", {
		successRedirect: "/homepage",
		failureRedirect: "/homepage/login"
	}), function(req, res){
	});
//logout routes
router.get("/homepage/logout", function(req, res){
	req.logout();
	res.redirect("/homepage");
});


module.exports = router;
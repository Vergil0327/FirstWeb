var express  = require('express'),
	passport = require('passport'),
	router   = express.Router();
var User     = require('../models/user');
var middleware = require('../middleware');

//root route
router.get("/", function(req, res){
	res.render("home");
});

/*REGISTER ROUTE*/
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
			req.flash("success", "Welcome " + user.name);
			res.redirect("/city");
		});
	});
});

/*LOGIN ROUTE*/
//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//handling login logic  app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
		successRedirect: "/city",
		failureRedirect: "/login"
	}), function(req, res){
});

/*LOGOUT ROUTE*/
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You've been logged out, Bye ~");
	res.redirect("/city");
});

module.exports = router;
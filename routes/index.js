var express  = require('express'),
	passport = require('passport'),
	router   = express.Router();
var User     = require('../models/user');
var middleware = require('../middleware');

//==========================
//     Root ROUTE
//==========================
router.get("/", function(req, res){
	res.render("home");
});

router.get("/homepage", function(req, res){
	res.render("home");
});

router.get("/about", function(req, res){
	res.render("about");
});


module.exports = router;
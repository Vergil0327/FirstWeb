var express  = require('express'),
	passport = require('passport'),
	router   = express.Router();
var User     = require('../models/user');
var Post     = require('../models/post.js');
var middleware = require('../middleware');

//==========================
//     Root ROUTE
//==========================
router.get("/", function(req, res){
	res.render("home");
});


//INDEX ROUTES
router.get("/homepage", function(req, res){
	Post.find({}, function(err, allPosts){
		if(err){
			console.log(err);
		} else {
			res.render("home", {posts: allPosts});
		}
	});
});

router.get("/about", function(req, res){
	res.render("about");
});


module.exports = router;
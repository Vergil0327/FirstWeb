var express  = require('express'),
	passport = require('passport'),
	router   = express.Router();
var User     = require('../models/user');
var Post   = require('../models/post.js');
var middleware = require('../middleware');

//==========================
//     Root ROUTE
//==========================
router.get("/", function(req, res){
	res.redirect("/homepage");
});


//INDEX ROUTES
router.get("/homepage", function(req, res){
	Post.find({}, function(err, allPosts){
		if(err){
			console.log(err);
		} else {
			res.render("./home/home", {posts: allPosts});
		}
	});
});

//CREATE ROUTES
router.post("/homepage", function(req, res){
	//get data from post request
	var newPost = req.body.post;
	console.log("Create a new post: ",newPost);
	//create data in mongoDB
	Post.create(newPost, function(err){
		if(err) {
			console.log(err);
		}else {
			res.redirect("/homepage");
		}
	});
});	

//NEW ROUTES
router.get("/homepage/new", function(req, res){
	res.render("./home/new");
});

//SHOW ROUTES 
router.get("/homepage/:id", function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		res.render("./home/show", {post: foundPost});
	});
});

router.get("/about", function(req, res){
	res.render("about");
});


module.exports = router;
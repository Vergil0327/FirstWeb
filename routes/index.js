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
			res.render("./home/index", {posts: allPosts});
		}
	});
});

//CREATE ROUTES
router.post("/homepage", middleware.checkwhoyouare, function(req, res){
	//get data from post request
	// var newPost = req.body.post;
	// console.log(req.user);
	var author = {
		username: req.user.username,
		id: req.user._id
	}
	// req.body.post.text = req.sanitize(req.body.post.text);
	var newPost = {title: req.body.post.title, tag: req.body.post.tag, text: req.body.post.text, author: author}
	// console.log("Create a new post: ",newPost);
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
router.get("/homepage/new", middleware.administrator, function(req, res){
	res.render("./home/new");
});

//SHOW ROUTES 
router.get("/homepage/:id", function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		res.render("./home/show", {post: foundPost});
	});
});

//EDIT ROUTES
router.get("/homepage/:id/edit", middleware.administrator, function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		if(err) {
			console.log(err);
		}else {
			res.render("./home/edit", {post: foundPost});
		}
	})
});

//UPDATE ROUTES
router.put("/homepage/:id", middleware.administrator, function(req, res){
	//find and update the correct post !important findByIdAndUpdate(find_that_data, input_that_data, callback)
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
		if(err) {
			res.redirect("/homepage");
		}else {
			res.redirect("/homepage/" + req.params.id);
		}
	})
});

//DESTORY ROUTES
router.delete("/homepage/:id", middleware.administrator, function(req, res){
	Post.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/homepage");
		}else {
			res.redirect("/homepage");
		}
	})
});

router.get("/about", function(req, res){
	res.render("./home/about");
});


module.exports = router;
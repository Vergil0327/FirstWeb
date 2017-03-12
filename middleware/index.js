// all the middlewares goes here
var City = require('../models/city'),
	Comment = require('../models/comment'),
	User 	= require('../models/user');

var middlewareObj = {
	checkCityOwnership: function(req, res, next){
		if(req.isAuthenticated()){
			City.findById(req.params.id, function(err, foundCity){
				if(err) {
					req.flash("error", "Found Nothing");
					res.redirect("back");
				}else {
					//does user own the city-paragraph ?
					if(foundCity.author.id.equals(req.user._id)){
						next();
					}else {
						req.flash("error", "You don't have permission to do that");
						res.redirect("back");
					}
				}
			})
		} else {
			req.flash("error", "You need to login first !");
			res.redirect("back");
		}
	},
	checkCommentOwnership: function(req, res, next){
		//does user log in ?
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err) {
					res.redirect("back");
				}else {
					//does user own the comment ?
					if(foundComment.author.id.equals(req.user._id)){
						next();
					}else {
						req.flash("error", "You don't have permission to do that");
						res.redirect("back");
					}
				}
			})
		}else {
			req.flash("error", "You need to login first !");
			res.redirect("back");
		}
	},
	isLoggedIn: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error", "You need to login first !");
		res.redirect("/login");
		}
		,
	checkUserExistence: function(req, res, next){
		User.findOne({username: req.body.username}, function(err, foundUser){
			if(foundUser){
				req.flash("error",'"' + req.body.username +  '" is already registered');
				res.redirect("back");
			} else {
				return next();
			}
		})
	},
	administrator: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}else {
			res.redirect("/homepage/login");
		}
	},
	CheckWhoYouAre: function(req, res, next){
		if(req.isAuthenticated()){
			if(req.user.username === process.env.USER){
				return next();
			}else {
				req.flash("error", "You're not allowed to do that");
				res.redirect("/homepage");
			}
		}else {
			res.redirect("back");
		}
	}
};

module.exports = middlewareObj;
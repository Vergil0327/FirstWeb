var express = require('express'),
	router  = express.Router({mergeParams: true});  
var City    = require('../models/city'),
	Comment = require('../models/comment');
var middleware = require('../middleware');

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	// find by id
	City.findById(req.params.id, function(err, city){
		if(err) {
			console.log(err);
		}else {
			res.render("comments/new", {city: city});
		}
	});
	
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup by using ID (req.params.id)
	City.findById(req.params.id, function(err, city){
		if(err) {
			console.log(err);
			res.redirect("/city");
		}else {
			//create new comment
			Comment.create(req.body.comments, function(err, comment){
				if(err){
					console.log(err);
				}else {	
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					// add comment to city
					city.comments.push(comment);
					city.save();
					// console.log(comment); // check
					//redirect to city show page
					req.flash("success", "Successfully added comment");
					res.redirect("/city/" + city._id);
				}
			});
		}
	});
});


//EDIT ROUTE
/*
city edit:    /city/:id/edit
comment edit: /city/:id/comments/:comment_id/edit
*/
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {city_id: req.params.id, comment: foundComment});
		}
	})
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/city/" + req.params.id);
		}
	})
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err) {
			res.redirect("back");
		}else {
			req.flash("success", "Comment deleted");
			res.redirect("/city/" + req.params.id);
		}
	});
});

module.exports = router;
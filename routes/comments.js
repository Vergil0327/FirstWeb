var express = require('express'),
	router  = express.Router({mergeParams: true});  //!important: because default path is defined in app.js (/city/:id/comment). In router.post, City.findById won't find req.params.id and req.params.id will be 'null'.  So, we need to pass {mergeParams: true} into express.Router()
var City    = require('../models/city'),
	Comment = require('../models/comment');
var middleware = require('../middleware'); //!important: index.js is a special name, it'll auto find index.js and require it

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	// find city by id
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
	//lookup city using ID (req.params.id)
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
					// console.log(req.user);
					// console.log("New comment's username will be: " + req.user.username);
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					// add comment to city
					city.comments.push(comment);
					city.save();
					console.log(comment); // check
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
we already set default path: /city/:id/comments in app.js (app.use("/city/:id/comments", commentsRoutes))
 for city edit:    /city/:id/edit
 for comment edit: /city/:id/comments/:comment_id/edit
 can't use like this: /city/:id/comments/:id/edit
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

// //middleware - move to index.js in middleware directory
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCommentOwnership(req, res, next){
// 	//does user log in ?
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id, function(err, foundComment){
// 			if(err) {
// 				res.redirect("back");
// 			}else {
// 				//does user own the comment ?
// 				if(foundComment.author.id.equals(req.user._id)){
// 					next();
// 				}else {
// 					res.redirect("back");
// 				}
// 			}
// 		})
// 	}else {
// 		res.redirect("back");
// 	}
// }

module.exports = router;
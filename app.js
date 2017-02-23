/*
#Adding in Flash Message !
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

#Landing Page Refactor

*/

var express       = require('express'),
	app 	      = express(),
	bodyParser    = require('body-parser'),
	mongoose      = require('mongoose'),
	methodOverride= require('method-override'),
	flash 		  = require('connect-flash'),  //install & require connect-flash
	City 	      = require('./models/city'),
	Comment       = require('./models/comment'),
	seedDB 	      = require('./seeds'),
	passport      = require('passport'),
	LocalStrategy = require('passport-local'),
	User 		  = require('./models/user');

//requiring routes
var commentRoutes = require('./routes/comments'),
	cityRoutes 	  = require('./routes/city'),
	indexRoutes   = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_taiwan');
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());  //tell app to use connect-flash
// seedDB(); //Seed the database - add some example data to check if anything wrong occurs

//PASSPORT CONFIGURATION
//Set up express-session
app.use(require('express-session')({
	secret: "Yelp Taiwan",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
//deprecate passport.use(new LocalStrategy(User.authenticate())); // User.authenticate() comes from passport-local-mongoose
// Starting with version 0.2.1, CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); //User.serializeUser() pass from passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); //User.deserializeUser() pass from passport-local-mongoose

//Middleware for SHOW/HIDE navbar link
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");  //add {error: req.flash("error")} to every template
	res.locals.success     = req.flash("success");  //add {sucess: req.flash("sucess")} to every template
	next();
});

/*ROUTES*/
app.use("/city/:id/comments", commentRoutes);
app.use("/city", cityRoutes); //define routes begain with /city
app.use("/", indexRoutes);



app.listen(3000, function(){
	console.log('Server Has Started !')
})










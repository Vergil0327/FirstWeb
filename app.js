var express          = require('express'),
	app 	         = express(),
	bodyParser       = require('body-parser'),
	mongoose         = require('mongoose'),
	methodOverride   = require('method-override'),
	expressSanitizer = require("express-sanitizer"),
	flash 		     = require('connect-flash'),  //install & require connect-flash
	dotEnv           = require('dotenv').config(),
	City 	         = require('./models/city'),
	Comment          = require('./models/comment'),
	seedDB 	         = require('./seeds'),
	passport         = require('passport'),
	LocalStrategy    = require('passport-local'),
	User 		     = require('./models/user'),
	Post 		     = require('./models/post');

//requiring routes
var commentRoutes = require('./routes/comments'),
	cityRoutes 	  = require('./routes/city'),
	authRoutes    = require('./routes/auth'),
	indexRoutes   = require('./routes/index');

mongoose.connect(process.env.dev_DB);
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.set("port", process.env.PORT||3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 
// seedDB(); //Seed the database 

//PASSPORT CONFIGURATION
//Set up express-session
app.use(require('express-session')({
	secret: "Yelp Taiwan",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); //User.serializeUser() pass from passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); //User.deserializeUser() pass from passport-local-mongoose

//Middleware 
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");    //{error: req.flash("error")} to every template
	res.locals.success     = req.flash("success");  //{sucess: req.flash("sucess")} to every template
	next();
});

/*ROUTES*/
app.use("/city/:id/comments", commentRoutes);
app.use("/city", cityRoutes); //define routes begain with /city
app.use("/", authRoutes);
app.use("/", indexRoutes);


app.listen(app.get("port"), function(){
	console.log('Server Has Started !')
})




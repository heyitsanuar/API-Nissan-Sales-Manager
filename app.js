var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    Branch                = require("./models/branch"),
    Client                = require("./models/client"),
    Model                 = require("./models/model"),
    Request               = require("./models/request"),
    User                  = require("./models/user"),
    Vehicle               = require("./models/vehicle"),
    seedDB                = require("./seeds"),
    expressSanitizer      = require("express-sanitizer"),
    methodOverride        = require("method-override"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

//Route files
var carRoutes     = require("./routes/cars"),
    requestRoutes = require("./routes/request"),
    authRoutes    = require("./routes/index");

//=======================Database setup==========================

var connectionSettings = { 
    server: { 
        socketOptions: { 
            keepAlive: 300000,
            connectTimeoutMS: 30000 
        } 
    }, 
    replset: { 
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS : 30000
        } 
    } 
};       

var mongoConnectionString = "mongodb://anuar:taquitos21@ds245250.mlab.com:45250/nissan";

mongoose.connect(mongoConnectionString, connectionSettings);

//=======================App setup===============================

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Passport configuration
app.use(require("express-session")({
    secret: "AMLO did nothing wrong",
    resave: false,
    saveUninitialized: false
}));

//Initializing passport
app.use(passport.initialize()); 
app.use(passport.session());

//Initializing Local Strategy Authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting current user for local's
app.use(function(req, res, next){
    res.locals.currentUser = req.User;
    next();
});

app.listen(3000, function(){
    console.log("Server listening");
});
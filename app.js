var express               = require("express");
var app                   = express();
var Agency                = require("./models/agency");
var Client                = require("./models/client");
var CarModel              = require("./models/model");
var Request               = require("./models/request");
var Vehicle               = require("./models/vehicle");
var User                  = require("./models/user");
var seedDB                = require("./seeds");
var expressSanitizer      = require("express-sanitizer");
var methodOverride        = require("method-override");
var bodyParser            = require("body-parser");
var passport              = require("passport");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

//Requiring route files
var carRoutes     = require("./routes/cars");
var clientRoutes  = require("./routes/clients");
var agencyRoutes  = require("./routes/agencies");
var vehicleRoutes = require("./routes/vehicles");
var requestRoutes = require("./routes/requests");
var userRoutes    = require("./routes/users");
var loginRoutes   = require("./routes/login");
var catalogRoutes = require("./routes/catalog");
var salesRoutes   = require("./routes/sales");
var authRoutes    = require("./routes/authentication");

//=======================App setup===============================

//Middleware
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

//Routing instances

app.use("/cars", carRoutes);
app.use("/clients", clientRoutes);
app.use("/agency", agencyRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/requests", requestRoutes);
app.use("/employees", userRoutes);
app.use("/login", loginRoutes);
app.use("/catalog", catalogRoutes);
app.use("/sales", salesRoutes);

module.exports = app;
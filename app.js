var express               = require("express");
var app                   = express();
var cors                  = require("cors");
var Agency                = require("./models/agency");
var Client                = require("./models/client");
var CarModel              = require("./models/model");
var Request               = require("./models/request");
var Vehicle               = require("./models/vehicle");
var User                  = require("./models/user");
var Sale                  = require("./models/sale");
var Version               = require("./models/version");
var Version               = require("./models/stock");
var seedDB                = require("./seeds");
var expressSanitizer      = require("express-sanitizer");
var methodOverride        = require("method-override");
var bodyParser            = require("body-parser");
var passport              = require("passport");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

//seedDB();

//Requiring route files
var carRoutes      = require("./routes/cars"),
    clientRoutes   = require("./routes/clients"),
    agencyRoutes   = require("./routes/agencies"),
    vehicleRoutes  = require("./routes/vehicles"),
    requestRoutes  = require("./routes/requests"),
    userRoutes     = require("./routes/users"),
    loginRoutes    = require("./routes/login"),
    catalogRoutes  = require("./routes/catalog"),
    salesRoutes    = require("./routes/sales"),
    comparerRoutes = require("./routes/comparer"),
    locationRoutes = require("./routes/location"),
    stockRoutes    = require("./routes/stock"),
    indexRoutes    = require("./routes/index"),
    authRoutes     = require("./routes/authentication");

//=======================App setup===============================

//Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
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
    res.locals.currentUser = req.user;
    next();
   
    /*if (res.locals.currentUser = "") {
        res.redirect("/login");
    }else{
        next();
    }*/
});

//Routing instances

app.use(indexRoutes);
app.use(authRoutes);
app.use(catalogRoutes);
app.use("/cars", carRoutes);
app.use("/clients", clientRoutes);
app.use("/agency", agencyRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/requests", requestRoutes);
app.use("/employees", userRoutes);
app.use("/login", loginRoutes);
app.use("/sales", salesRoutes);
app.use("/comparer", cors(), comparerRoutes);
app.use("/locations", locationRoutes);
app.use(stockRoutes);

module.exports = app;
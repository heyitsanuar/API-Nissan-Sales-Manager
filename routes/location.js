var express = require("express");
var router  = express();
var LocationController = require("../controllers/locations");

app.get("/states", LocationController.findState);
app.get("/cities", LocationController.findCities);

module.exports = router;
var express = require("express");
var router  = express();
var LocationController = require("../controllers/locations");

router.get("/states", LocationController.findStates);
router.get("/cities/:state", LocationController.findCities);

module.exports = router;
var express = require("express");
var router  = express();
var LocationController = require("../controllers/locations");

router.get("/states", LocationController.findStates);
router.get("/cities/:state", LocationController.findCities);
router.get("/:state/:city", LocationController.findAgenciesWithManager);
router.get("/:state/:city/no-manager", LocationController.findAgenciesWithNoManager);
router.get("/all/:state/:city", LocationController.findAllAgenciesByStateAndCity);
router.get("/:state/", LocationController.findAgenciesByState);

module.exports = router;
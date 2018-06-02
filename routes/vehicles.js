var express = require("express");
var VehicleController = require("../controllers/vehicle");
var router  = express.Router();

router.get("/", VehicleController.findVehicles);
router.post("/", VehicleController.addVehicle);
router.put("/", VehicleController.updateVehicle);
router.delete("/", VehicleController.removeVehicle);

module.exports = router;
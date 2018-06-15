var express           = require("express");
var VehicleController = require("../controllers/vehicle");
var router            = express.Router();

router.get("/", VehicleController.findVehicles);
router.post("/:id", VehicleController.addVehicle);
router.put("/:id", VehicleController.updateVehicle);
router.delete("/:id", VehicleController.removeVehicle);

router.get("/agency", VehicleController.findVehiclesByAgency);

router.get("/local", VehicleController.showLocalStock);
router.get("/global", VehicleController.showAdminStock);
router.get("/salesman", VehicleController.showSalesmanStock);

module.exports = router;
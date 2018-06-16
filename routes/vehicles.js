var express           = require("express");
var VehicleController = require("../controllers/vehicle");
var router            = express.Router();

router.get("/", VehicleController.findVehicles);
router.get("/model", VehicleController.findVehiclesByModel);
router.get("/model/version", VehicleController.findVehiclesByModel);

router.post("/:id", VehicleController.addVehicle);
router.put("/:id", VehicleController.updateVehicle);
router.delete("/:id", VehicleController.removeVehicle);

router.get("/agency", VehicleController.findVehiclesByAgency);
router.get("/agency/salesman", VehicleController.findVehiclesBySalesman);
router.post("/models/:level", VehicleController.findVehiclesByModel);
router.post("/models/version/:level", VehicleController.findVehiclesByVersion);

router.get("/local", VehicleController.showLocalStock);
router.get("/global", VehicleController.showAdminStock);
router.get("/salesman", VehicleController.showSalesmanStock);

module.exports = router;
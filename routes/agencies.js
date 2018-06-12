var express          = require("express");
var AgencyController = require("../controllers/agency");
var router           = express.Router();

router.get("/show", AgencyController.showAgencies);

router.get("/", AgencyController.findAgencies);
router.get("/:id", AgencyController.findAgencyById);

router.post("/", AgencyController.addAgency);
router.put("/:id", AgencyController.updateAgency);
router.delete("/:id", AgencyController.removeAgency);

module.exports = router;
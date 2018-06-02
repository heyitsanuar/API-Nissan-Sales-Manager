var express          = require("express");
var AgencyController = require("../controllers/agency");
var router           = express.Router();

router.get("/", AgencyController.findAgencies);
router.post("/", AgencyController.addAgency);
router.put("/", AgencyController.updateAgency);
router.delete("/", AgencyController.removeAgency);

module.exports = router;
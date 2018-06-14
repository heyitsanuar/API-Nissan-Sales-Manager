var express            = require("express");
var ComparerController = require("../controllers/comparer");
var router             = express.Router();

router.get("/", ComparerController.showComparer);

module.exports = router;
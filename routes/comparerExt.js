var express             = require("express");
var ComparerController  = require("../controllers/comparerExt");
var router              = express();

router.get("/", ComparerController.getModels);

module.exports = router;
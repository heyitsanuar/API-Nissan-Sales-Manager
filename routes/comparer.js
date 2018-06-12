var express             = require("express");
var ComparerController  = require("../controllers/comparer");
var router              = express();

router.get("/", ComparerController.getModels);

module.exports = router;
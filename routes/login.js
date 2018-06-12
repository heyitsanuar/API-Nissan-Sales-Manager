var express         = require("express");
var LoginController = require("../controllers/login");
var router          = express.Router();
var passport        = require("passport");

router.get("/", LoginController.goToLogin);

module.exports = router;
var express = require("express");
var IndexController = require("../controllers/index");
var router = express.Router();

router.get("/", IndexController.showLogin);

module.exports = router;
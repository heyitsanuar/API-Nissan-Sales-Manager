var express         = require("express");
var LoginController = require("../controllers/login");
var router          = express.Router();

router.get("/", LoginController.goToLogin);
router.post("/", LoginController.signIn);

module.exports = router;
var express        = require("express");
var UserController = require("../controllers/user");
var router         = express.Router();

router.post("/", UserController.addUser);
router.put("/", UserController.updateUser);
router.delete("/", UserController.removeUser);

router.get("/managers", UserController.findManagers);
router.get("/salesmen", UserController.findSalesmen);
router.get("/managers/show", UserController.showManagers);
router.get("/salesmen/show", UserController.showEmployees);

module.exports = router;
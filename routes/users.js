var express        = require("express");
var UserController = require("../controllers/user");
var router         = express.Router();

router.post("/", UserController.addUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.removeUser);

router.get("/managers", UserController.findManagers);
router.get("/salesmen", UserController.findSalesmen);
router.get("/:id", UserController.findUserById);
router.get("/managers/show", UserController.showManagers);
router.get("/salesmen/show", UserController.showEmployees);

module.exports = router;
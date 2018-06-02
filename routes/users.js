var express        = require("express");
var UserController = require("../controllers/user");
var router         = express.Router();

router.get("/", UserController.findUsers);
router.post("/", UserController.addUser);
router.put("/", UserController.updateUser);
router.delete("/", UserController.removeUser);

module.exports = router;
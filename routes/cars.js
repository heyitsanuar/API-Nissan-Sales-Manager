var express         = require("express");
var ModelController = require("../controllers/model");
var router          = express.Router();

router.get("/", ModelController.findModels);
router.post("/", ModelController.addModel);
router.put("/", ModelController.updateModel);
router.delete("/", ModelController.removeModel);

module.exports = router;
var express         = require("express");
var ModelController = require("../controllers/model");
var router          = express.Router();

router.get("/", ModelController.findModels);
router.post("/", ModelController.addModel);
router.put("/:id", ModelController.updateModel);
router.delete("/:id", ModelController.removeModel);

module.exports = router;
var express         = require("express");
var ModelController = require("../controllers/model");
var router          = express.Router();

//Routes for car model
router.get("/", ModelController.findModels);
router.post("/", ModelController.addModel);
router.put("/:id", ModelController.updateModel);
router.delete("/:id", ModelController.removeModel);

router.get("/models", ModelController.showModelsPage);

router.get("/:id", ModelController.findModelById);
router.get("/category/:category", ModelController.findModelsByCategory);
router.get("/images/:id", ModelController.findModelImages);

//Routes for versions
router.post("/version/new/:id", ModelController.addVersion);

module.exports = router;
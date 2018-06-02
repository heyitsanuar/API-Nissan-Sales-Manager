var express           = require("express");
var CatalogController = require("../controllers/catalog");
var router            = express.Router();

router.get("/", CatalogController.findCatalog);
router.get("/details/:carId", CatalogController.findDetailsById);

module.exports = router;
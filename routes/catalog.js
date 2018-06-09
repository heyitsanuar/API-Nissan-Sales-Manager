var express           = require("express");
var CatalogController = require("../controllers/catalog");
var router            = express.Router();

router.get("/", CatalogController.showCatalog);
router.get("/details/:carId", CatalogController.showDetailsPage);

module.exports = router;
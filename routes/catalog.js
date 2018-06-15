var express           = require("express");
var CatalogController = require("../controllers/catalog");
var router            = express.Router();

router.get("/home", CatalogController.showCatalog);
router.get("/cars/details/:id", CatalogController.showDetailsPage);

module.exports = router;
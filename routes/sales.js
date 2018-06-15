var express = require("express");
var SalesController = require("../controllers/sale");
var router  = express.Router();

router.get("/", SalesController.findSales);
router.post("/", SalesController.addSale);
router.put("/", SalesController.updateSale);
router.delete("/", SalesController.removeSale);

router.get("/own", SalesController.showSalesBySalesman);
router.get("/local", SalesController.showSalesByAgency);

module.exports = router;
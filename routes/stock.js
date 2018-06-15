var express = require("express");
var StockController = require("../controllers/stock");
var router = express.Router();

router.get("/stock", StockController.findStock);
router.post("/stock/all", StockController.addStock);
router.post("/stock/:category", StockController.addStockByCategory);

module.exports = router;
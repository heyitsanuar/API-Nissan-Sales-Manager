var express          = require("express");
var ClientController = require("../controllers/client");
var router           = express.Router();

router.get("/", ClientController.findClients);
router.post("/", ClientController.addClient);
router.put("/", ClientController.updateClient);
router.delete("/", ClientController.removeClient);

module.exports = router;
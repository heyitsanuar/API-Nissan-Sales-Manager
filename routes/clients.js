var express          = require("express");
var ClientController = require("../controllers/client");
var router           = express.Router();

router.get("/", ClientController.findClients);
router.post("/", ClientController.addClient);
router.put("/", ClientController.updateClient);
router.delete("/", ClientController.removeClient);

router.get("/show", ClientController.showClientsPage);
router.get("/agency/:id", ClientController.findClientsByAgency);
module.exports = router;
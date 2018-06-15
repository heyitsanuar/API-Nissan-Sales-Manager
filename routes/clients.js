var express          = require("express");
var ClientController = require("../controllers/client");
var router           = express.Router();

router.get("/show", ClientController.showClientsPage);

router.get("/", ClientController.findClients);
router.post("/", ClientController.addClient);
router.put("/", ClientController.updateClient);
router.delete("/", ClientController.removeClient);

router.get("/:state", ClientController.findClientsByState);
router.get("/:state/:city", ClientController.findClientsByStateAndCity);

module.exports = router;
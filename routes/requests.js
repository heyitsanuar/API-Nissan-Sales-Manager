var express           = require("express");
var RequestController = require("../controllers/request");
var router            = express();

router.get("/", RequestController.findRequests);
router.post("/", RequestController.addRequest);
router.put("/", RequestController.updateRequest);
router.delete("/", RequestController.removeRequest);

router.get("/inbox", RequestController.showRequestsPage);

module.exports = router;

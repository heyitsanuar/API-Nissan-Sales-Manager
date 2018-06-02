var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Catalog route get");
});

router.get("/details/:carId", function(req, res){
    res.send("Details route get");
});

module.exports = router;
var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Sales route get");
});

module.exports = router;
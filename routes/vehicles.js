var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Vehicle route get");
});

router.post("/", function(req, res){
    res.send("Vehicle route post");
});

router.put("/", function(req, res){
    res.send("Vehicle route put");
});

router.delete("/", function(req, res){
    res.send("Vehicle route delete");
});

module.exports = router;
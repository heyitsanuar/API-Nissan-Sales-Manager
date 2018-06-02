var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Clients route get");
});

router.post("/", function(req, res){
    res.send("Clients route post");
});

router.put("/", function(req, res){
    res.send("Clients route put");
});

router.delete("/", function(req, res){
    res.send("Clients route delete");
});

module.exports = router;
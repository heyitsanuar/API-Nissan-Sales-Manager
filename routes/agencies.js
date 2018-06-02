var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Agency route get");
});

router.post("/", function(req, res){
    res.send("Agency route post");
});

router.put("/", function(req, res){
    res.send("Agency route update");
});

router.delete("/", function(req, res){
    res.send("Agency route delete");
});

module.exports = router;
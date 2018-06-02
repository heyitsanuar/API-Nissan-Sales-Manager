var express = require("express"),
    router  = express();

router.get("/", function(req, res){
    res.send("Request route get");
})

router.post("/", function(req, res){
    res.send("Request route post");
})

router.put("/", function(req, res){
    res.send("Request route put");
})

router.delete("/", function(req, res){
    res.send("Request route delete");
})

module.exports = router;

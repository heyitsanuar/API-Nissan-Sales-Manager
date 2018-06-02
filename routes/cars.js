var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Cars page route get");
});

router.post("/", function(req, res){
   res.send("Cars page route post"); 
});

router.put("/", function(req, res){
    res.send("Cars page route put");
});

router.delete("/", function(req, res){
    res.send("Cars page route delete");
});

module.exports = router;
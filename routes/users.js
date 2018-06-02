var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Users route get");
});

router.post("/", function(req, res){
    res.send("Users router post");
});

router.put("/", function(req, res){
    res.send("Users router put");
});

router.delete("/", function(req, res){
    res.send("Users route delete");
})

module.exports = router;
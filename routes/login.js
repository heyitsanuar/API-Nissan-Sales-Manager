var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.send("Login route get");
});

router.post("/", function(req, res){
    res.send("Login route post");
});

module.exports = router;
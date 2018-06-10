var express = require("express");
var router = express.Router();
var passport = require("passport");

router.post("/sign-in", passport.authenticate("local", 
{
    successRedirect: "/home",
    failureRedirect: "/login"
}), function(req, res){
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router;
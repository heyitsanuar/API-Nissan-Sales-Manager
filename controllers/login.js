'use strict'

var User = require("../models/user");

function goToLogin(req, res){

    if (req.user == undefined) {
        res.render("login");
    } else {
        res.redirect("/home");
    }
    
}

module.exports = {
    goToLogin
};

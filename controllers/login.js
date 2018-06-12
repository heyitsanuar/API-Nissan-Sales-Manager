'use strict'

var User = require("../models/user");

function goToLogin(req, res){
    res.render("login");
}

module.exports = {
    goToLogin
};

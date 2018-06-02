'use strict'

var User = require("../models/user");

function goToLogin(req, res){
    res.send("Login get route");
}

function signIn(req, res){
    res.send("Login post route");
}

module.exports = {
    goToLogin,
    signIn
};

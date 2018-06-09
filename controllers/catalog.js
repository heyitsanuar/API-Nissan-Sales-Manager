'use strict'

var Model = require("../models/model");

function showDetailsPage(req, res){
    res.render("details");
}

function showCatalog(req, res){
    //Gets all models back to the user
    res.render("catalog");
}

module.exports = {
    showDetailsPage,
    showCatalog
};
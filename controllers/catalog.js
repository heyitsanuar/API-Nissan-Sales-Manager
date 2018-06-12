'use strict'

var Model = require("../models/model");

function showDetailsPage(req, res){
    //Renders car details page
    res.render("details");
}

function showCatalog(req, res){
    //Renders catalog main page
    res.render("home");
}

module.exports = {
    showDetailsPage,
    showCatalog
};
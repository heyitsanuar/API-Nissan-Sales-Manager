'use strict'

var Model = require("../models/model");

function showDetailsPage(req, res){
    //Renders car details page
    res.render("details");
}

function showCatalog(req, res){
    //Renders catalog main page
    Model.find({"meta.active": true}, (err, foundModels) => {
        if(err){
            res.send(err);
        }else{
            res.render("home", {models: foundModels});
        }
    });

}

module.exports = {
    showDetailsPage,
    showCatalog
};
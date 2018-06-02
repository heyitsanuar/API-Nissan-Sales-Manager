'use strict'

var Model = require("../models/model");

function findDetailsById(req, res){
    res.send("Catalog details route get");
}

function findCatalog(req, res){
    res.send("Catalog show get");
}

module.exports = {
    findDetailsById,
    findCatalog
};
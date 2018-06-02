'use strict'

var Model = require("../models/model");

function findModels(req, res){
    res.send("Models route get");
}

function addModel(req, res){
    res.send("Models route post");
}

function updateModel(req, res){
    res.send("Models route put");
}

function removeModel(req, res){
    res.send("Models route delete")
}

module.exports = {
    findModels,
    addModel,
    updateModel,
    removeModel
};
'use strict'

var Vehicle = require("../models/vehicle");

function findVehicles(req, res){
    res.send("Vehicle route get");
}

function addVehicle(req, res){
    res.send("Vehicle route post");
}

function updateVehicle(req, res){
    res.send("Vehicle route update");
}

function removeVehicle(req, res){
    res.send("Vehicle route delete");
}

module.exports = {
    findVehicles,
    addVehicle,
    updateVehicle,
    removeVehicle
};
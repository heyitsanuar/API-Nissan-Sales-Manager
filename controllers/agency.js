'use strict'

var Agency = require("../models/agency");

function findAgencies(req, res){
    res.send("Agency route get");
}

function addAgency(req, res){
    res.send("Agency route post");
}

function updateAgency(req, res){
    res.send("Agency route put");
}

function removeAgency(req, res){
    res.send("Agency route delete");
}

module.exports = {
    findAgencies,
    addAgency,
    updateAgency,
    removeAgency
};
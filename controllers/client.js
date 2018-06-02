'use strict'

var Client = require("../models/client");

function findClients(req, res){
    res.send("Clients route get");
}

function addClient(req, res){
    res.send("Clients route post");
}

function updateClient(req, res){
    res.send("Clients route put");
}

function removeClient(req, res){
    res.send("Clients route remove");
}

module.exports = {
    findClients,
    addClient,
    updateClient,
    removeClient
};
'use strict'

var Request = require("../models/request");

function findRequests(req, res){
    res.send("Request route get");
}

function addRequest(req, res){
    res.send("Request route post");
}

function updateRequest(req, res){
    res.send("Request route put");
}

function removeRequest(req, res){
    res.send("Request route delte")
}

module.exports = {
    findRequests,
    addRequest,
    updateRequest,
    removeRequest
};
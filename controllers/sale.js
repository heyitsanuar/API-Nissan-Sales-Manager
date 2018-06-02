'use strict'

var Sale = require("../models/sale");

function findSales(req, res){
    res.send("Sales route get");
}

function addSale(req, res){
    res.send("Sales route post");
}

function updateSale(req, res){
    res.send("Sales route put");
}

function removeSale(req, res){
    res.send("Sales route delete");
}

module.exports = {
    findSales,
    addSale,
    updateSale,
    removeSale
};
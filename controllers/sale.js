'use strict'

var Sale    = require("../models/sale");
var User    = require("../models/user");
var Client  = require("../models/client");
var Vehicle = require("../models/vehicle");
var Agency  = require("../models/agency");

function showSalesBySalesman(req, res){
    res.render("salesman/sales");
}

function findSales(req, res){

    Sale.find({"meta.active": true}, (err, foundSales) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundSales);
        }
    });

}

function findSalesByAgency(req, res){

    Sales.find({"agency.id": req.params.id, "meta.active": true}, (err, foundSales) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundSales);
        }
    });

}

function findSalesBySalesman(req, res){

    Sale.find({"salesman.id": req.user._id, "meta.active": true}, (err, foundSales) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundSales);
        }
    });

}

function addSale(req, res){

    User.findOne({"_id": req.user._id, "meta.active": true}, (err, foundUser) => {
        if(err){
            res.send(err);
        }else{
            Vehicle.findOne({"_id": req.params.vehicleId,"meta.active": true}, (err, foundVehicle) => {
                if(err){
                    res.send(err);
                }else{
                    
                    Client.findOne({"_id": req.body.client, "meta.active": true}, (err, foundClient) => {
                        if(err){
                            res.send(err);
                        }else{

                            Agency.findOne({"_id": foundVehicle._id, "meta.active": true}, (err, foundAgency) => {
                                
                                var newSale = {
                                    vehicle: {
                                        id: foundVehicle._id,
                                        name: foundVehicle.model.name,
                                        version: foundVehicle.model.version,
                                        serieNumber: foundVehicle.serieNumber
                                    },
                                    client: {
                                        id: foundClient._id,
                                        name: foundClient.name + " " + foundClient.surname
                                    },
                                    salesman: {
                                        id: foundUser._id,
                                        name: foundUser.username
                                    },
                                    agency: {
                                        id: foundAgency._id,
                                        name: foundAgency.name
                                    }
                                    
                                };
                    
                                Sale.create(newSale, (err, addedSale) => {
                                    if(err){
                                        res.send(err);
                                    }else{
                                        res.end(addedSale);
                                    }
                                });

                            });
                        }
                    });
                }
            });
        }
    });

}

//To Do
function updateSale(req, res){
    res.send("Sales route put");
}

//To Do
function removeSale(req, res){
    res.send("Sales route delete");
}

module.exports = {
    showSalesBySalesman,
    findSales,
    findSalesByAgency,
    findSalesBySalesman,
    addSale,
    updateSale,
    removeSale
};
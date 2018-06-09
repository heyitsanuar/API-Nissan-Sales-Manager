'use strict'

var Request = require("../models/request");
var Vehicle = require("../models/vehicle");
var Branch  = require("../models/agency");
var User    = require("../models/user");
var Client  = require("../models/client");

function findRequestsByAgency(req, res){
    Request.find({"meta.active": true}, (err, foundRequests) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundRequests);
        }
    });
}

function addRequest(req, res){
    //Params vehicleId, destinyAgencyId
    //Body params client

    Vehicle.findOne({"_id": req.params.id, "meta.active": true}, (err, foundVehicle) => {
        if(err){
            res.send(err);
        }else{

            Agency.findOne({"_id": foundVehicle.agency.id, "meta.active": true}, (err, originAgency) => {
                if(err){
                    res.send(err);
                }else{

                    User.findOne({"_id": originAgency.manager.id, "meta.active": true}, (err, receiverUser) => {
                        if(err){
                            res.send(err);
                        }else{

                            Client.findOne({"_id": req.body.clientId, "meta.active": true}, (err, foundClient) => {
                                if(err){
                                    res.send(err);
                                }else{

                                    Agency.find({"employees.id": currentUser._id, "meta.active": true}, (err, destinyAgency) => {
                                        if(err){
                                            res.send(err);
                                        }else{
                                            var newRequest = {
                                                vehicle: {
                                                    id: foundVehicle._id,
                                                    name: foundVehicle.name,
                                                    version: foundVehicle.version,
                                                    serieNumber: foundVehicle.serieNumber
                                                },
                                                agencies:{
                                                    origin: {
                                                        id: originAgency._id,
                                                        name: originAgency.name
                                                    },
                                                    destiny:{
                                                        id: destinyAgency._id,
                                                        name: destinyAgency.name
                                                    }
                                                },
                                                users:{
                                                    emitter: {
                                                        id: currentUser._id,
                                                        username: currentUser.username
                                                    },
                                                    receiver: {
                                                        id: receiverUser._id,
                                                        username: receiverUser.username
                                                    }
                                                },
                                                client: {
                                                    id: foundClient._id,
                                                    name: foundClient.name + " " + foundClient.surname
                                                }
                                            };

                                            Request.create(newRequest, (err, createdRequest) => {
                                                if(err){
                                                    res.send(err);
                                                }else{
                                                    res.send(createdRequest);
                                                }
                                            });
                        
                                        }
                                    });
                                    
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
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
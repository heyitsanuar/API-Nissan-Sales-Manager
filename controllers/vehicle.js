'use strict'

var Vehicle = require("../models/vehicle");
var Model   = require("../models/model");
var Agency  = require("../models/agency");

function findVehicles(req, res){
    Vehicle.find({}, (err, foundVehicles) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundVehicles);
        }
    });
}

function addVehicle(req, res){

    var newVehicle = {
        model: {
            id: "",
            name: req.body.model.name,
            version: req.body.model.version
        },
        serieNumber: req.body.serieNumber,
        agency: {
            id: "",
            name: req.body.agency.name
        }
    };

    Model.findOne({
        "name": newVehicle.model.name,
        "versions.name": newVehicle.model.version
    }, (err, foundModel) =>{

        if(err){
            res.send(err);
        }else{

            Agency.findOne({"name": newVehicle.agency.name}, (err, foundAgency) => {
                if(err){
                    res.send(err);
                }else{
                    newVehicle.model.id      = foundModel._id;
                    newVehicle.agency.id   = foundAgency._id;

                    Vehicle.create(newVehicle, (err, addedVehicle) => {
                        if(err){
                            res.send(err);
                        }else{
                            res.send(addedVehicle);
                        }
                    });
                }
            });

        }
    });
    
}

function updateVehicle(req, res){
    
    var updatedVehicle = {
        model: {
            id: "",
            name: req.body.model.name,
            version: req.body.model.version
        },
        serieNumber: req.body.serieNumber,
        agency: {
            id: "",
            name: req.body.agency.name
        }
    };

    Model.findOne({
        "name": updatedVehicle.model.name,
        "versions.name": updatedVehicle.model.version
    }, (err, foundModel) =>{
        if(err){
            res.send(err);
        }else{
            Agency.findOne({"name": updatedVehicle.agency.name}, (err, foundAgency) => {
                if(err){
                    res.send(err);
                }else{
                    updatedVehicle.model.id  = foundModel._id;
                    updatedVehicle.agency.id = foundAgency._id;

                    Vehicle.findByIdAndUpdate(req.params.id, updatedVehicle, (err, modifiedVehicle) => {
                        if(err){
                            res.send(err);
                        }else{
                            res.send(modifiedVehicle);
                        }
                    });
                }
            });
        }
    });
}

function removeVehicle(req, res){
    Vehicle.findByIdAndRemove(req.params.id, (err, foundVehicle) => {
        if(err){
            res.send(err);
        }else{
            res.send("Deleted succesfully");
        }
    });
}

module.exports = {
    findVehicles,
    addVehicle,
    updateVehicle,
    removeVehicle
};
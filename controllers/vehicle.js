'use strict'

var Vehicle = require("../models/vehicle");
var Model   = require("../models/model");
var Agency  = require("../models/agency");
var User    = require("../models/user");

function findVehicles(req, res){
    Vehicle.find({"meta.active": true}, (err, foundVehicles) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundVehicles);
        }
    });
}

function findVehiclesByAgency(req, res){
    //Buscar usuario
    User.findOne({"_id": currentUser._id, "meta.active": true},(err, foundUser) =>{
        if(err){
            res.send(err);
        }else{
            Agency.findOne({"manager.id": foundUser._id, "meta.active": true}, (err, foundAgency) =>{
                if(err){
                    res.send(err);
                }else{
                    Vehicle.find({"agency.id": foundAgency._id, "meta.active": true}, (err, foundVehicles) => {
                        if(err){
                            res.send(err);
                        }else{
                            res.send(foundVehicles);
                        }
                    });
                }
            });
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
        },
        meta: {
            modified_at: ""
        }
    };

    //We always use meta.active to filter the ones that are not "deleted"

    Model.findOne({
        "name": updatedVehicle.model.name,
        "versions.name": updatedVehicle.model.version,
        "meta.active": true
    }, (err, foundModel) =>{
        if(err){
            res.send(err);
        }else{
            Agency.findOne({"name": updatedVehicle.agency.name, "meta.active": true}, (err, foundAgency) => {
                if(err){
                    res.send(err);
                }else{
                    
                    //Updates modified at field
                    updatedVehicle.model.id         = foundModel._id;
                    updatedVehicle.agency.id        = foundAgency._id;
                    updatedVehicle.meta.modified_at = Date.now;

                    Vehicle.findOneAndUpdate({"_id": req.params.id, "meta.active": true}, updatedVehicle, (err, modifiedVehicle) => {
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
    Vehicle.findOne({"_id": req.params.id, "meta.active": true}, (err, foundVehicle) => {
        if(err){
            res.send(err);
        }else{
            foundVehicle.meta.active = false;
            foundVehicle.save();

            res.send(foundVehicle);
        }
    });
}

module.exports = {
    findVehicles,
    findVehiclesByAgency,
    addVehicle,
    updateVehicle,
    removeVehicle
};
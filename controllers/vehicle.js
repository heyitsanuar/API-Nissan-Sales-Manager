'use strict'

var Vehicle = require("../models/vehicle");
var Model   = require("../models/model");
var Agency  = require("../models/agency");
var User    = require("../models/user");

function showLocalStock(req, res){
    res.render("manager/stock");
}

function showAdminStock(req, res){
    res.render("admin/stock");
}

function showSalesmanStock(req, res){
    res.render("salesman/stock");
}

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

    Agency.findOne({"manager.id": req.user._id ,"meta.active": true}, (err, foundAgency) => {
        if(err){
            res.send(err);
        }else{
            if(!foundAgency)
                return res.send("No hay agencia");

            Vehicle.find({"agency.id": foundAgency._id, "meta.active": true}, (err, foundVehicle) => {
                if(err){
                    res.send(err);
                }else{
                    res.send(foundVehicle);
                }
            });
        }
    });

}

function addVehicle(req, res){

    Model.findOne({
        "_id": req.params.id,
        "meta.active": true
    }, (err, foundModel) =>{

        if(err){
            res.send(err);
        }else{

            Agency.findOne({"name": req.body.agency.name}, (err, foundAgency) => {
                if(err){
                    res.send(err);
                }else{

                    var newVehicle = {
                        model: {
                            id: foundModel._id,
                            name: req.body.model.name,
                            version: req.body.model.version
                        },
                        serieNumber: req.body.serieNumber,
                        agency: {
                            id: foundAgency._id,
                            name: foundAgency.name
                        }
                    };

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
    
    //We always use meta.active to filter the ones that are not "deleted"

    Model.findOne({
        "name": req.body.model.name,
        "versions.name": req.body.model.version,
        "meta.active": true
    }, (err, foundModel) =>{

        if(err){
            res.send(err);
        }else{
            Agency.findOne({"name": req.body.agency.name, "meta.active": true}, (err, foundAgency) => {
                if(err){
                    res.send(err);
                }else{
                    
                    var updatedVehicle = {
                        model: {
                            id: foundModel._id,
                            name: req.body.model.name,
                            version: req.body.model.version
                        },
                        serieNumber: req.body.serieNumber,
                        agency: {
                            id: foundAgency._id,
                            name: req.body.agency.name
                        },
                        meta: {
                            modified_at: Date.now
                        }
                    };

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
    showLocalStock,
    showAdminStock,
    showSalesmanStock,
    findVehicles,
    findVehiclesByAgency,
    addVehicle,
    updateVehicle,
    removeVehicle,
};
'use strict'

var Stock = require("../models/stock");
var Vehicle = require("../models/vehicle");
var Agency = require("../models/agency");
var Model = require("../models/model");

function findStock(req, res){
    
    Stock.find({"meta.active": true}, (err, foundStocks) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundStocks);
        }
    });

}

function addStock(req, res){

    Agency.findOne(
        {
            "state": req.body.state,
            "city": req.body.city,
            "name": req.body.agency,
            "meta.active": true
        }, (err, foundAgency) => {
            if(err){
                res.send(err);
            }else{

                if(!foundAgency)
                    return res.send("There are no agencies");

                Model.find({"meta.active": true}, (err, foundModels) => {
                    if(err){
                        res.send(err);
                    }else{
                        if(!foundModels)
                            return res.send("There are no models.");
                        
                        //We make a for each in order to insert each of the found models
                        foundModels.forEach(function(model){
                            
                            var newVehicle = {
                                model: {
                                    id: model._id,
                                    name: model.modelo
                                },
                                serieNumber: "NA",
                                agency: {
                                    id: foundAgency._id,
                                    name: foundAgency.name
                                }
                            };

                            Vehicle.create(newVehicle, (err, createdVehicle) => {
                                if(err){
                                    return res.send(err);
                                }else{             
                                    console.log(createdVehicle);
                                }
                            });

                        });

                        var newStock = {
                            agency:{
                                id: foundAgency._id,
                                name: foundAgency.name
                            },
                            category: "All"
                        };
                        
                        Stock.create(newStock, (err, createdStock) => {
                            if(err){
                                res.send(err);
                            }else{
                                res.send(createdStock);
                            }
                        });
                    }
                });

            }
    });

}

function addStockByCategory(req, res){
    Agency.findOne(
        {
            "state": req.body.state,
            "city": req.body.city,
            "name": req.body.agency,
            "meta.active": true
        }, (err, foundAgency) => {
            if(err){
                res.send(err);
            }else{
                if(!foundAgency)
                    return res.send("There are no agencies");
                
                Model.find({"categoria": req.params.category, "meta.active": true}, (err, foundModels) => {
                    if(err){
                        res.send(err);
                    }else{
                        if(!foundModels)
                            return res.send("There are no models");

                        //We make a for each in order to insert each of the found models
                        foundModels.forEach(function(model){
                        
                            var newVehicle = {
                                model: {
                                    id: model._id,
                                    name: model.name,
                                    version: model.name
                                },
                                serieNumber: "NA",
                                agency: {
                                    id: foundAgency._id,
                                    name: foundAgency.name
                                },
                                status: "Assigned"
                            };

                            Vehicle.create(newVehicle, (err, createdVehicle) => {
                                if(err){
                                    res.send(err);
                                }else{
                                    res.send("Vehicle created");
                                }
                            });

                        });

                        var newStock = {
                            agency:{
                                id: foundAgency._id,
                                name: foundAgency.name
                            },
                            category: foundModels.categoria
                        };
                        
                        Stock.create(newStock, (err, createdStock) => {
                            if(err){
                                return res.send(err);
                            }else{
                                console.log(createdStock);
                            }
                        });
                    }
                });
            }
        }
    );
}

module.exports = {
    findStock,
    addStock,
    addStockByCategory,
};
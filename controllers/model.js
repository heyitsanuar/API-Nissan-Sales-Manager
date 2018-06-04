'use strict'

var Model = require("../models/model");

function findModels(req, res){
    //Looks for all the models within the database
    Model.find({"meta.active": true}, (err, foundModels) =>{
        if(err){
            res.send(err);
        }else{
            res.send(foundModels);
        }
    });
}

function addModel(req, res){

    //Creating the object of the model to be added and its properties
    var newModel = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        year: req.body.year,
        colors: req.body.colors,
        versions: req.body.versions,
        photos: req.body.photos
    };

    //Creates the model and adds it to the database
    Model.create(newModel, (err, modelAdded) =>{
        if(err){
            res.send(err);
        }else{
            res.send(modelAdded);
        }
    });
}

function updateModel(req, res){

    //Looks for the model by id, if found, it's gonna be updated
    Model.findOne({"_id": req.params.id, "meta.active": true}, (err, modelUpdated) => {
        if(err){
            res.send(err);
        }else{

            modelUpdated.name          = req.body.name;
            modelUpdated.description   = req.body.description;
            modelUpdated.category      = req.body.category;
            modelUpdated.year          = req.body.year;
            modelUpdated.colors        = req.body.colors;
            modelUpdated.versions      = req.body.versions;
            modelUpdated.photos        = req.body.photos;
            modelUpdated.meta.modified = Date.now;

            modelUpdated.save();

            res.send(modelUpdated);
        }
    });

}

function removeModel(req, res){

    //Looks for the model by id, if found, it's gonna be removed
    Model.findOneAndUpdate({"_id": req.params.id, "meta.active": true}, {"meta.active": false}, (err, modelToDelete) => {
        if(err){
            res.send(err);
        }else{
            res.send("Deleted successfully.");
        }
    });

}

module.exports = {
    findModels,
    addModel,
    updateModel,
    removeModel
};
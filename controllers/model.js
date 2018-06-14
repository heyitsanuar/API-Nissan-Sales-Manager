'use strict'

var Model   = require("../models/model");
var Version = require("../models/version");

function showModelsPage(req, res){
    res.render("admin/models");
}

function findModels(req, res){
    
    //Looks for all the models within the database
    Model.find({"meta.active": true})
         .populate("variantes")
         .exec( (err, foundModels) =>{
             if(err){
                 res.send(err);
             }else{
                 res.send(foundModels);
             }
         }
    );

}

function findModelsByCategory(req, res){

    var category = req.params.category;

    Model.find({"categoria": category, "meta.active": true})
         .populate("variantes")
         .exec( (err, foundModels) => {
             if(err){
                 res.send(err);
             }else{
                 res.send(foundModels);
             }
         }
    );

}

function findModelById(req, res){

    Model.findOne({"_id": req.params.id, "meta.active": true})
         .populate("variantes")
         .exec( (err, foundModel) => {
             if(err){
                 res.send(err);
             }else{
                 res.send(foundModel)
             }
         });

}

function findModelImages(req ,res){

    Model.findOne({"_id": req.params.id, "meta.active": true}, (err, foundVehicle) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundVehicle.photos);
        }
    });

}

function findModelsDistinct(req, res){
    Model.find({"meta.active": true}, (err, foundModels) => {
        if(err){
            res.send(err);
        }else{
            if(!foundModels)
                return res.send("No hay modelos.");

            var models = [];

            foundModels.forEach(function(model){
                models.push(model.modelo);
            });
            
            models = models.filter(function(element, position) {
                return models.indexOf(element) == position;
            });

            models = JSON.stringify(models);

            res.send(models);
        }
    });
}

//To Do
function findVersions(req, res){

}

function addModel(req, res){

    //Creates the object of the model to be added and its properties
    var newModel = {
        modelo: req.body.name,
        descripcion: req.body.description,
        dimensiones: req.body.dimensions,
        categoria: req.body.category,
        anio: req.body.year,
        colores: req.body.colors,
        photos: req.body.photos,
        imagenes: req.body.photos.imagesURL
    };

    console.log(req.body.colors);

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

            modelUpdated.name             = req.body.name;
            modelUpdated.description      = req.body.description;
            modelUpdated.category         = req.body.category;
            modelUpdated.year             = req.body.year;
            modelUpdated.colors           = req.body.colors;
            modelUpdated.photos           = req.body.photos;
            modelUpdated.meta.modified_at = Date.now;

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

function addVersion(req, res){

    Model.findOne({"_id": req.params.id, "meta.active": true}, (err, foundModel) => {
        if(err){
            res.send(err);
        }else{

            var newVersion = {
                model: foundModel.model,
                variante: req.body.version,
                precio: req.body.cost,
                caracteristicas: req.body.caracteristicas
            };

            Version.create(newVersion, (err, createdVersion) => {
                if(err){
                    res.send(err);
                }else{
                    foundModel.variantes.push(createdVersion);
                    foundModel.save();

                    res.send(foundModel);
                }
            });

        }

    });

}

function updateVersion(req, res){

    Version.findOne({"_id": req.params.id, "meta.active": true}, (err, foundVersion) => {
        if(err){
            res.send(err);
        }else{
            foundVersion.variante         = req.body.version;
            foundVersion.precio           = req.body.cost; 
            foundVersion.caracteristicas  = req.body.caracteristicas;
            foundVersion.meta.modified_at = Date.now;

            foundVersion.save();

            res.send(foundVersion);
        }
    });

}

function removeVersion(req, res){
    
    Version.findOne({"_id": req.params.id, "meta.active": true}, (err, foundVersion) => {
        if(err){
            res.send(err);
        }else{
            foundVersion.meta.active = false;
            foundVersion.save();
            
            res.send(foundVersion);
        }
    });

}

module.exports = {
    showModelsPage,
    findModels,
    findModelsByCategory,
    findModelById,
    findModelImages,
    addModel,
    updateModel,
    removeModel,
    addVersion,
    updateVersion,
    removeVersion
};
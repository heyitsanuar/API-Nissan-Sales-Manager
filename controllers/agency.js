'use strict'

var Agency = require("../models/agency");
var User   = require("../models/user");

function findAgencies(req, res){

    Agency.find({"meta.active": true}, (err, foundAgencies) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundAgencies);
        }
    });

}

function addAgency(req, res){
    
    var newAgency = {
        name: req.body.name,
        region: req.body.region,
        city: req.body.city,
        cp: req.body.cp,
        colony: req.body.colony,
        address: req.body.address,
        manager: req.body.manager
    };

    User.findOne({"username": newAgency.manager, "meta.active": true}, (err, foundUser) =>{
        
        if(err){
            res.send(err);
        }else{

            var fullName = foundUser.name + " " + foundUser.surname;

            var newManager = {
                id: foundUser._id,
                fullName: fullName
            };

            newAgency.manager = newManager;

            Agency.create(newAgency, (err, agencyAdded) => {
                if(err){
                    res.send(err);
                }else{
                    res.send(agencyAdded);
                }
            });

        }

    });

}

function updateAgency(req, res){
    
    var updatedAgency = {
        name: req.body.name,
        region: req.body.region,
        city: req.body.city,
        cp: req.body.cp,
        colony: req.body.colony,
        address: req.body.address,
        manager: req.body.manager,
        meta: {
            modified_at: ""
        }
    };

    User.findOne({"username": updatedAgency.manager, "meta.active": true}, (err, foundUser) => {
        
        if(err){
            res.send(err);
        }else{

            var fullName = foundUser.name + " " + foundUser.surname;

            var newManager = {
                id: foundUser._id,
                fullName: fullName
            };

            updatedAgency.manager          = newManager;
            updatedAgency.meta.modified_at = Date.now;

            Agency.findOneAndUpdate({"_id": req.params.id, "meta.active": true}, updatedAgency, (err, agencyChanged) =>{
                if(err){
                    res.send(err);
                }else{
                    res.send(agencyChanged);
                }
            });

        }
    });

}

function removeAgency(req, res){

    Agency.findOne({"_id": req.params.id, "meta.active": true}, (err, agencyToRemove) => {
        if(err){
            res.send(err);
        }else{
            agencyToRemove.meta.active = false;
            agencyToRemove.save();

            res.send("Deleted Successfully");
        }
    });

}

function setManager(req, res){
    Agency.findOne({"_id": req.params.id ,"meta.active": true}, (err, foundAgency) => {
        if(err){
            res.send(err);
        }else{
            User.findOne({"username": req.body.username, "meta.active": true}, (err, foundUser) => {
                if(err){
                    res.send(err);
                }else{

                    foundAgency.manager.id = foundUser._id;
                    foundAgency.name = foundUser.name + foundUser.surname;
                    foundAgency.meta.modified_at = Date.now;

                    foundAgency.save();

                    res.send(foundUser);
                }
            });
        }
    });
}

module.exports = {
    findAgencies,
    addAgency,
    updateAgency,
    removeAgency,
    setManager
};
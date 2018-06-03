'use strict'

var Agency = require("../models/agency");
var User   = require("../models/user");

function findAgencies(req, res){
    Agency.find({}, (err, foundAgencies) => {
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

    User.findOne({username: newAgency.manager}, (err, foundUser) =>{
        
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
        manager: req.body.manager
    };

    User.findOne({username: updatedAgency.manager}, (err, foundUser) =>{
        
        if(err){
            res.send(err);
        }else{

            var fullName = foundUser.name + " " + foundUser.surname;

            var newManager = {
                id: foundUser._id,
                fullName: fullName
            };

            updatedAgency.manager = newManager;

            Agency.findByIdAndUpdate(req.params.id, updatedAgency, (err, agencyChanged) => {
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
    
    Agency.findByIdAndRemove(req.params.id, (err, agencyToRemoved) => {
        if(err){
            res.send(err);
        }else{
            res.send("Deleted Succesfully");
        }
    });

}

module.exports = {
    findAgencies,
    addAgency,
    updateAgency,
    removeAgency
};
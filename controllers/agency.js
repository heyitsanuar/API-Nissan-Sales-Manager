'use strict'

var Agency = require("../models/agency");
var User   = require("../models/user");

function showAgencies(req, res){
    res.render("admin/agencies");
}

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
        state: req.body.state,
        city: req.body.city,
        cp: req.body.cp,
        address: req.body.address,
        manager: {
            id: req.user._id,
            fullName: req.user.name + " " + req.user.surname
        }
    };

    Agency.create(newAgency, (err, agencyAdded) => {
        if(err){
            res.send(err);
        }else{
            res.send(agencyAdded);
        }
    });
        
}

function updateAgency(req, res){
    
    Agency.findOne({"_id": req.params.id, "meta.active": true}, (err, foundAgency) => {
        if(err){
            res.send(err);
        }else{
            foundAgency.name = req.body.name;
            foundAgency.state = req.body.state;
            foundAgency.city = req.body.city;
            foundAgency.cp = req.body.cp;
            foundAgency.address = req.body.address;
            foundAgency.modified_at = Date.now;

            foundAgency.save();

            res.send(foundAgency);
        }
    });
}

function removeAgency(req, res){

    Agency.findOneAndUpdate({"_id": req.params.id, "meta,active": true}, (err, agencyToRemove) => {
        if(err){
            res.send(err);
        }else{
            res.send("Deleted successfully");
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
    showAgencies,
    findAgencies,
    addAgency,
    updateAgency,
    removeAgency,
    setManager
};
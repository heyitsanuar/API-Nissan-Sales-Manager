'use strict'

var Agency = require("../models/agency");

function findStates(req, res){
    
    Agency.find({"meta.active": true}, (err, foundAgencies) => {
        if(err){
            res.send(err);
        }else{

            var states = [];

            foundAgencies.forEach(function(agency){
                states.push(agency.state);
            });
            
            states = states.filter(function(element, position) {
                return states.indexOf(element) == position;
            });

            states = JSON.stringify(states);

            res.send(states);
        }
    });

}

function findCities(req, res){

    Agency.find({"state": req.params.state, "meta.active": true}, (err, foundAgencies) => {
        if(err){
            res.send(err);
        }else{

            var cities = [];

            foundAgencies.forEach(function(agency){
                cities.push(agency.city);
            });

            cities = cities.filter(function(element, position){
                return cities.indexOf(element) == position;
            });

            cities = JSON.stringify(cities);
            
            res.send(cities);
        }
    });
}

//Shows agencies with no manager
function findAgenciesByStateAndCity(req, res){
    Agency.find(
        {
            "state": req.params.state,
            "manager.id": { $ne: req.user._id},
            "city": req.params.city,
            "meta.active": true
        }, (err, foundAgencies) => {
            if(err){
                res.send(foundAgencies);
            }else{
                if(!foundAgencies){
                    res.send("There are no agencies");
                }else{
                    var agencies = [];

                    foundAgencies.forEach(function(agency){
                        agencies.push(agency.name);
                    });

                    agencies = agencies.filter(function(element, position) {
                        return agencies.indexOf(element) == position;
                    });

                    agencies = JSON.stringify(agencies);

                    res.send(agencies);
                }
            }
        }
    );
}

//Shows all agencies either they have manager or not
function findAgenciesByState(req, res){
    Agency.find({"state": req.params.state, "meta.active": true}, (err, foundAgencies) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundAgencies);
        }
    });
}

//Shows all agencies either they have manager or not
function findAllAgenciesByStateAndCity(req, res){
    Agency.find(
        {
            "state": req.params.state,
            "city": req.params.city,
            "meta.active": true
        }, (err, foundAgencies) => {
            if(err){
                res.send(foundAgencies);
            }else{
                if(!foundAgencies){
                    res.send("There are no agencies");
                }else{
                    res.send(foundAgencies);
                }
            }
        }
    );
}

module.exports = {
    findStates,
    findCities,
    findAgenciesByStateAndCity,
    findAgenciesByState,
    findAllAgenciesByStateAndCity
}
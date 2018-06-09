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
            
            res.send(cities);
        }
    });
}

module.exports = {
    findStates,
    findCities
}
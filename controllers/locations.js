'use strict'

var Agency = require("../models/agency");

function findState(req, res){
    
    Agency.find({"meta.active": true}, (err, foundAgencies) => {
        if(err){
            res.send(err);
        }else{

            //The found agencies could have the same states many times
            //This variable filters the array to have unique states
            statesArray = foundAgencies.state.filter(function(element, position) {
                return foundAgencies.state.indexOf(element) == position;
            });

            //Returns the list of states
            res.send(statesArray);
        }
    });

}

function findCities(req, res){
    var state = req.body;

    Agency.find({"state": state, "meta.active": true}, (err, foundAgencies) => {
        if(err){
            res.send(err);
        }else{
            
            //The found agencies could have the same states many times
            //This variable filters the array to have unique states
            citiesArray = foundAgencies.state.filter(function(element, position) {
                return foundAgencies.state.indexOf(element) == position;
            });

            //Returns the list of states
            res.send(citiesArray);
        }
    });
}

module.exports = {
    findState,
    findCities
}
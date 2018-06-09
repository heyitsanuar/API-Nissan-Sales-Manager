'use strict'

var Client  = require("../models/client");

function findClients(req, res){
    Client.find({"meta.active" : true}, (err, foundClients) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundClients);
        }
    });
}

function addClient(req, res){
    
    var newClient = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        state: req.body.state,
        city: req.body.city,
        cp: req.body.cp,
        address: req.body.address
    };
    
    Client.create(newClient, (err, createdClient) => {
        if(err){
            res.send(err);
        }else{
            res.send(createdClient);
        }
    });
}

function updateClient(req, res){
    res.send("Clients route put");
}

function removeClient(req, res){
    res.send("Clients route remove");
}

module.exports = {
    findClients,
    addClient,
    updateClient,
    removeClient
};
'use strict'

var Client  = require("../models/client");
var Agency  = require("../models/agency");

function showClientsPage(req, res){
    res.render("salesman/clients");
}

function findClients(req, res){
    //To Check
    Client.find({"meta.active" : true}, (err, foundClients) => {
        if(err){
            res.send(err);
        }else{
            if(foundClients){
                res.send(foundClients);
            }else{
                res.send("No hay clientes.");
            }
        }
    });

}

function findClientsByAgency(req, res){
    Agency.findOne({"_id": req.params.id, "meta.active": true}, (err, foundClients) => {
        if(err){
            res.send(err);
        }else{
            if(foundClients){
                res.send(foundClients);
            }else{
                res.send("No hay cliente");
            }
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
    
    var updatedClient = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        state: req.body.state,
        city: req.body.city,
        cp: req.body.cp,
        address: req.body.address
    };

    Client.findOneAndUpdate({"_id": req.params.id, "meta.active": true}, updatedClient, (err, foundClient) => {
        if(err){
            res.send(err);
        }else{
            if(foundClient){
                res.send(foundClient);
            }else{
                res.send("El cliente no existe");
            }
        }
    });
}

function removeClient(req, res){
    
    Client.findOneAndUpdate({"_id": req.params.id, "meta.active": true}, {"meta.active": false}, (err, clientToRemove) => {
        if(err){
            res.send(err);
        }else{
            res.send("Deleted successfully");
        }
    });
    
}

module.exports = {
    showClientsPage,
    findClients,
    findClientsByAgency,
    addClient,
    updateClient,
    removeClient
};
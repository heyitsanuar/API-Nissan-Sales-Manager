'use strict'

var Client  = require("../models/client");

function findClients(req, res){
    //To Check
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

//To Do
function updateClient(req, res){

}

//To Do
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
    findClients,
    addClient,
    updateClient,
    removeClient
};
'use strict'

var SharedModels = require("./modules/SharedModels");

function getModels(req, res){

    var sharedModels = new SharedModels();

    sharedModels.getModels().then((result)=>{
        res.send(result);
    });
    
}

module.exports = {
    getModels
}
'use strict'

var mongoose = require("mongoose");
var app      = require("./app");
var port     = 3000;

mongoose.Promise = global.Promise;

//=======================Database setup==========================

var mongoConnectionString = "mongodb://anuar:taquitos21@ds245250.mlab.com:45250/nissan";
//var mongoConnectionString = "mongodb://casabi.ddns.net:5000,casabi.ddns.net:5001,casabi.ddns.net:5002,casabi.ddns.net:5003/nissan?replicaSet=repl0&readPreference=secondary";

mongoose.connect(mongoConnectionString)
        .then(() => {
            console.log("Connected to database");

            app.listen(port, ()=>{
                console.log("Server listening on port " + port);
            });

        })
        .catch(err => console.log(err));
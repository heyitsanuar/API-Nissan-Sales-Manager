var mongoose = require("mongoose");
var Agency   = require("./models/agency");
var Client   = require("./models/client");
var CarModel = require("./models/model");
var Request  = require("./models/request");
var Vehicle  = require("./models/vehicle");
var User     = require("./models/user");
var Sale     = require("./models/sale");
var Version  = require("./models/version");

var Users = [
    {
        username: "heyitsanuar",
        password: "pastor",
        name: "Anuar",
        surname: "Jiménez",
        role: "Salesman",
    },
    {
        username: "alvaro123",
        password: "asada",
        name: "Alvaro",
        surname: "Rodriguez",
        role: "Manager"
    },
    {
        username: "paco123",
        password: "suadero",
        name: "Xavier",
        surname: "Batista",
        role: "Admin"
    }
];

function seedDB(){
    User.remove({}, (err) => {
        if(err){
            console.log(err);
        }else{
            Users.forEach(function(userToCreate){

                User.register(userToCreate, userToCreate.password, function(err, registeredUser){
                    if(err){ //If not authenticated, the user won't go on
                        console.log(err);
                        //return res.render("register");
                        return res.send("Error");
                    }else{
                        console.log("User added");
                    }
                });

            });
        }
    });

}

module.exports = seedDB;
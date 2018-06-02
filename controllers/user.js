'use strict'

var User     = require("../models/user");
var passport = require("passport");

function findUsers(req, res){
    res.send("Users route get");
}

function addUser(req, res){

    var newUser = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        role: req.body.role
    };
    
    User.register(newUser, req.body.password, function(err, registeredUser){
        if(err){ //If not authenticated, the user won't go on
            console.log(err);
            //return res.render("register");
            return res.send("Error");
        }

        //If authenticated, the user will be redirected to blogs
        passport.authenticate("local")(req, res, function(){
            //res.redirect("/blogs");
            console.log("Authenticated");
        });
    });

}

function updateUser(req, res){
    res.send("Users route put");
}

function removeUser(req, res){
    res.send("Users route delete");
}

module.exports = {
    findUsers,
    addUser,
    updateUser,
    removeUser
};
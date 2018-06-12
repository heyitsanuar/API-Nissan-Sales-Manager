'use strict'

var User     = require("../models/user");
var Agency   = require("../models/agency");
var passport = require("passport");

function findManagers(req, res){
    User.find({"role": "Manager", "meta.active": true}, (err, foundManagers) => {
        if(err){
            res.send(err);
        }else{
            res.send(foundManagers);
        }
    });
}

function findSalesmen(req, res){
    
    Agency.find({"manager.id": req.user._id, "meta.active": true})
           .populate("employees")
           .exec( (err, foundSalesmen) => {
               if(err){
                   res.send(err);
               }else{
                   res.send(foundSalesmen.employees);
               }
           });

}

function addUser(req, res){

    var newUser = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        role: "NA"
    };

    if(req.user.role == "Admin"){

        newUser.role = "Manager";
        
        User.register(newUser, req.body.password, function(err, registeredUser){
            if(err){ //If not authenticated, the user won't go on
                res.send(err);
            }else{
                res.send(registeredUser);
            }
        });

    }else{
        
        newUser.role = "Salesman"

        Agency.findOne({"manager.id": req.user._id, "meta.active": true}, (err, foundAgency) => {
            if(err){
                res.send(err);
            }else{

                User.register(newUser, req.body.password, function(err, registeredUser){
                    if(err){ //If not authenticated, the user won't go on
                        console.log(err);
                        res.send(err);
                    }else{
            
                        foundAgency.employees.push(registeredUser);
                        foundAgency.meta.modified_at = Date.now;
                
                        foundAgency.save();
        
                        res.send(registeredUser);
        
                    }
        
                });

            }
        });
        

    }

    
}

//To Do
function updateUser(req, res){
    res.send("Users route put");
}

//To Do
function removeUser(req, res){
    res.send("Users route delete");
}

function showManagers(req, res){
    res.render("admin/managers");
}

function showEmployees(req, res){
    res.render("manager/employees");
}

module.exports = {
    showManagers,
    showEmployees,
    findManagers,
    findSalesmen,
    addUser,
    updateUser,
    removeUser
};
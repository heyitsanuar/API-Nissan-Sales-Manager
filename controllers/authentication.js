var express = require("express");
var passport = require("passport");

function login(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.status(500).json({
                error: "Ocurrió un error",
                desc: err
            });
        }
        if (!user) {
            res.status(404).json({
                error: "Usuario y/o Contraseña incorrectos"
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                res.status(500).json({
                    error: "Ocurrió un error",
                    desc: err
                });
            } else {
                user.password = "WontBeDatIzI";
                if (user.meta.active) {
                    res.status(200).json({
                        user: user
                    });
                }
                else {
                    res.status(404).json({
                        error: "Usuario y/o Contraseña incorrectos"
                    });
                }
            }
        });
    })(req, res);
}

function logout(req, res) {
    req.user = undefined;
    req.logout();
    res.redirect("/login");
};

module.exports = {
    login,
    logout
}
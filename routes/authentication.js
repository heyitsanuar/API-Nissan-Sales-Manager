var express = require("express");
var router = express.Router();
var sesion = require("../controllers/authentication");

router.post("/sign-in", (req, res) => {
    sesion.login(req, res);
});

router.get("/logout", (req, res) => {
    sesion.logout(req, res);
});

module.exports = router;
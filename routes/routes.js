// Server routes
const express = require("express");
const router = express.Router();
const drinks = require("../data/drinks");
const users = require("../data/users");

// Constructor
const constructorMethod = app => {
    app.use("/", router);
    app.use("*", (req, res) => {
        res.status(404);
    });
};

module.exports = constructorMethod;
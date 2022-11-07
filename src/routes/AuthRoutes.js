//External Lib Import
const AuthRoutes = require("express").Router();

//Internal Lib Import
const AuthControllers = require("../controller/Auth/AuthControllers");

//Login User
AuthRoutes.post("/LoginUser", AuthControllers.LoginUser);

module.exports = AuthRoutes;

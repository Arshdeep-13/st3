const express = require("express");
const Route = express.Router();
const defaultController = require("../controllers/defaultController.js");
const registerController = require("../controllers/registerController.js");
const loginController = require("../controllers/loginController.js");
const protectedFunc = require("../controllers/defaultController.js");
const isAuth = require("../middleware/auth.js");

Route.get("/", defaultController.defaultFunc);
Route.post("/register", registerController.registerFunc);
Route.post("/login", loginController.loginFunc);
Route.get("/protected", isAuth, defaultController.protectedFunc);

module.exports = Route;

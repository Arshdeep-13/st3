const express = require("express");
const route = express.Router();
const defaultControllers = require("../controllers/defaultControllers.js");
const loginControllers = require("../controllers/loginControllers.js");
const registerControllers = require("../controllers/registerControllers.js");
const auth = require("../middleware/auth.js");

route.get("/", auth.isAuth, defaultControllers.func);
route.get("/", loginControllers.func);
route.get("/login", loginControllers.func);
route.post("/login", loginControllers.handler);
route.get("/register", registerControllers.func);
route.post("/register", registerControllers.handler);
route.get("/success", auth.isAuth, defaultControllers.func);

module.exports = route;

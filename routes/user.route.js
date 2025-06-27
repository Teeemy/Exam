const express = require("express")
const { getUser, createUser, loginUser } = require("../controllers/user.controller")
const authentication = require("../middlewares/auth.middleware")

const route = express.Router();

route.get("/", authentication, getUser);

route.post("/", createUser);

route.post("/login", loginUser);



module.exports = route;
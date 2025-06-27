const express = require("express");
const { createKyc, getOneKyc } = require("../controllers/kyc.controller");
const authentication = require("../middlewares/auth.middleware")
const route = express.Router();

route.post("/", authentication, createKyc);
route.get("/kyc", authentication, getOneKyc);


module.exports = route;

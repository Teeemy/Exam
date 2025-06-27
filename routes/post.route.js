const express = require("express");
const { createPost, getPosts,} = require("../controllers/post.controller");
const authentication = require("../middlewares/auth.middleware")
const route = express.Router()

route.post("/", authentication, createPost);
route.get("/post", getPosts);

module.exports = route;
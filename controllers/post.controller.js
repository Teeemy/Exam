const postModel = require("../models/post.model");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const createPost = async (req, res) => {
    const body = req.body;
    const { id } = req.user;
    console.log(req.user)
    try {
        const newPost = new postModel({ creator: id, ...body });
        const savedPost = await newPost.save();    
        await userModel.findByIdAndUpdate(id, { $push: { posts: savedPost.id } }, { new: true }
        );
        return res.send("post created successfully")

    } catch (error) {
        console.log(error.message)
        return res.send(error.message);
    }
};
const getPosts = async (req, res) => {
    const { userId } = req.query;
    try {
        const posts = await postModel.find({ creator: userId })
        return res.json(posts);
    } catch (error) {
        return res.send("Something went wrong.")
    }
};
module.exports = { createPost, getPosts};
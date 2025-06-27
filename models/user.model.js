const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female"]
        },

        kyc: {
            type: mongoose.Types.ObjectId,
            ref: "Kyc",
        },
        posts: [{type: mongoose.Types.ObjectId, ref:"post"}],

  },
  {timestamps: true}

);

const userModel = mongoose.model("users",userSchema)
module.exports = userModel;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: true,
    },
      
    postDesc: {
      type: String,
      required: true,
    },
        
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required:true,
    },

  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
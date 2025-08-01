const express = require("express");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const fileUploadRoute = require("./routes/fileUploads.route"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected successfully"))
    .catch((error) => console.log(error));

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/upload", fileUploadRoute); 

app.listen(5000, () => {
    console.log("app is running on port 5000");
});

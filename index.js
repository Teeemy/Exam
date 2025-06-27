const express = require("express");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected succesfully"))
    .catch((error) => console.log(error));
app.use(express.json());
app.use(cookieParser());


app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(3000,()=> {
    console.log("app is running on port 3000")
});

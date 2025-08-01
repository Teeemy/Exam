const cloudinary = require("../utils/cloudinary");
const fs = require("fs/promises");
const{CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const singleFile = async (req, res) => {
    const fileResponse= await cloudinary.uploader.upload(req.file.path);
    console.log(fileResponse)
    console.log(req.file)
    return res.send("singlefile uploaded successfully")
};

const arrayFiles = async (req, res) => {
    try { 
        const uploadedResponses = await cloudinary.uploader.upload(req.file);
        console.log(uploadedResponses);
        await Promise.all(files.map(file =>fs.unlink(file.path)))
        return res.send("files uploaded successfully");
    } catch (error) {
        console.error(error)
    }
  };

const multipleFiles = async (req, res, next) => {
    console.log(req.files);
    return res.send("multiple files uploaded")

};


module.exports = { singleFile ,arrayFiles,multipleFiles};

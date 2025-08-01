const express = require("express")
const route = express.Router();
const { singleFile, arrayFiles, multipleFiles} = require("../controllers/fileUploads.controller");
const multer = require("multer")

const upload = require("../utils/multer");

// upload multiple fields
const moreField = upload.fields([{ name: "previewPix", maxCount: 1 }, { name: "detailedPix", maxCount: 1 }, { name: "video", maxCount: 1 },])



route.post("/single", upload.single("dp"), singleFile);

route.post("/array", upload.array("dp", 3), arrayFiles);// expecting 2 argument i.e filename and max file expecting in the field

route.post("/multiple", moreField, multipleFiles);

module.exports = route;
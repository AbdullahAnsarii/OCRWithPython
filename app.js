//dependencies
let express = require("express"); //use to create server
let app = express();
let fs = require("fs"); //use to read file
let multer = require("multer"); //use to upload files
let {TesseractWorker} = require("tesseract.js"); //use to read images
let worker = new TesseractWorker();

//storage setup
let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
let upload = multer({storage: storage}).single("abdullah"); //here setting up upload

app.set("view engine", "ejs");

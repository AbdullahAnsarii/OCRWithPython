let express = require("express"); //use to create server
let app = express();
let fs = require("fs"); //use to read file
let multer = require("multer"); //use to upload files
let {TesseractWorker} = require("tesseract.js"); //use to read images
let worker = new TesseractWorker();
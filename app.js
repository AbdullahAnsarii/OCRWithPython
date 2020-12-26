//dependencies
let express = require("express"); //use to create server
let app = express();
let fs = require("fs"); //use to read file
let multer = require("multer"); //use to upload files
let { createWorker } = require("tesseract.js"); //use to read images
const worker = createWorker({
    logger: m => console.log(m),
    });

//storage setup
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
let upload = multer({storage: storage}).single("abdullah"); //here setting up upload

//setting up front end
app.set("view engine", "ejs");

//server start up
let PORT = 3000 // if we run this live we have to use environment var
app.listen(PORT, console.log("Server is running successfully"));

//routes
app.get("/", (req, res, next) => {
    res.render("index");
})
app.post("/upload", (req,res,next) => {
    upload(req, res, err => {
        fs.readFile(`/uploads/${req.file.originalname}`, (err, data) => {
            if (err){
                console.log("There is an error in your request", err);
            }
            worker
            .recognize(data, "eng", {tessjs_create_pdf: '1'})
            .then((result) => {
                res.send(result.text);
            })
            .finally(() => {
                worker.terminate();
            })
        })
    })
})


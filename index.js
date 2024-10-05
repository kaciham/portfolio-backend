
require("./configs/db.config")
require('dotenv').config();

const express = require("express");
const app = express()
const multer = require("multer")
const port = process.env.PORT
const morgan = require("morgan");
const cors = require("cors")
const path = require("path")

console.log('====================================');
console.log(port);
console.log('====================================');


const router = require("./routes/routesIndex.js");
const { config } = require("dotenv");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))
app.use("/api", router);

///Images static directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/imagesProject', express.static(path.join(__dirname, 'imagesProject')));
app.use('/imagesPortfolio', express.static(path.join(__dirname, 'imagesPortfolio')));
app.use('/pdf', express.static(path.join(__dirname,  'pdf')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})  
const { config } = require("dotenv");
require("./configs/db.config")
require('dotenv').config();

const express = require("express");
const app = express()
const multer = require("multer")
const port = process.env.PORT
const morgan = require("morgan");
const cors = require("cors")
const path = require("path")
const router = require("./routes/routesIndex.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: "https://kacihamroun.website.com",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // Cache preflight request results for 24 hours
    exposedHeaders: ["Content-Length", "Content-Type"],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(morgan("tiny"))
app.use("/api", router);

///Images static directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/imagesProject', express.static(path.join(__dirname, 'imagesProject')));
app.use('/imagesPortfolio', express.static(path.join(__dirname, 'imagesPortfolio')));
app.use('/pdf', express.static(path.join(__dirname,  'pdf')));

app.get("/",(req,res) => (
    res.send("Hello There !")
)
)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})  
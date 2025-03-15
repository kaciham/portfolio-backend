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

const whitelist = [
    'https://kacihamroun.website.com',
    'http://localhost:3000',  // For local development
    'http://localhost:5173'   // For Vite default port
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    credentials: true,
    maxAge: 86400,
    exposedHeaders: ['Content-Length', 'Content-Type', 'X-Total-Count'],
    optionsSuccessStatus: 204,
    preflightContinue: false
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
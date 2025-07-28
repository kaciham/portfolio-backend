require("./configs/db.config")
require('dotenv').config();

const express = require("express");
const app = express()
const port = process.env.PORT
const morgan = require("morgan");
const cors = require("cors")
const path = require("path")
const router = require("./routes/routesIndex.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS middleware before other routes
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
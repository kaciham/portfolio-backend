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


const whitelist = [
    'https://kacihamroun.com',
    'https://kacihamroun.website',
    'http://localhost:3000',
    'http://localhost:5173',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'file://'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) {
            return callback(null, true);
        }
        // Check if the origin is in the whitelist
        if (whitelist.indexOf(origin) !== -1 || whitelist.some(w => origin.startsWith(w))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS middleware before other routes
// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Add security headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Private-Network', 'true');
    next();
});

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
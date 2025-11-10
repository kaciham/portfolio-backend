require("./configs/db.config")
require('dotenv').config();

const express = require("express");
const app = express()
const port = process.env.PORT
const morgan = require("morgan");
const cors = require("cors")
const path = require("path")
const router = require("./routes/routesIndex.js");
const { corsOptions, isDevelopment } = require("./configs/cors.config.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle CORS errors gracefully
app.use((err, req, res, next) => {
    if (err.message && err.message.includes('CORS policy violation')) {
        return res.status(403).json({
            error: 'CORS Error',
            message: isDevelopment ? err.message : 'Access denied',
            origin: isDevelopment ? req.headers.origin : undefined
        });
    }
    next(err);
});

// Add security and development headers
app.use((req, res, next) => {
    // Allow private network access (useful for local development)
    res.header('Access-Control-Allow-Private-Network', 'true');
    
    // Add development-friendly headers
    if (isDevelopment) {
        res.header('X-Development-Mode', 'true');
    }
    
    next();
});

app.use(morgan("tiny"))

// Development CORS logging
if (isDevelopment) {
    app.use((req, res, next) => {
        if (req.headers.origin) {
            console.log(`🌐 CORS Request from: ${req.headers.origin}`);
        }
        next();
    });
}

app.use("/api", router);

///Images static directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/imagesProject', express.static(path.join(__dirname, 'imagesProject')));
app.use('/imagesPortfolio', express.static(path.join(__dirname, 'imagesPortfolio')));
app.use('/pdf', express.static(path.join(__dirname,  'pdf')));

// Serve admin interface
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get("/",(req,res) => (
    res.send("Hello There !")
    )
)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    })
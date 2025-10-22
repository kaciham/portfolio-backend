require('dotenv').config();
const mongoose = require("mongoose");

const uri = process.env.DATABASE_CONNEXION;

// Provide sensible mongoose connection options to avoid long hangs and improve resiliency.
const mongooseOptions = {
    // socketTimeoutMS closes sockets after inactivity
    socketTimeoutMS: 10000,
    // connectTimeoutMS controls how long to wait when connecting
    connectTimeoutMS: 10000,
    // Use the unified topology
    serverSelectionTimeoutMS: 10000,
};

mongoose.connect(uri, mongooseOptions).then(() => {
    console.log("Connected to MongoDb");
}).catch((error) => {
    console.log("Error connecting to MongoDB", error && error.message ? error.message : error);
});

// Optional: log mongoose connection events for debugging
mongoose.connection.on('connected', () => console.log('Mongoose connected'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err && err.message ? err.message : err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected'));

module.exports = mongoose;

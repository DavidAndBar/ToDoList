/*
    This is the main file for the express application. In this document we will initialize express itself and conexion to the database is
    going to be attached. 
*/
// First step: Import libraries and other modules for the program.
require('dotenv').config();
const express = require('express');
// Import cors option after install it in the project using npm i cors. CORS give access to the page to access to the database
const cors = require('cors');
const backtest = require('./back/backTest.js');
const auth = require('./back/auth.js');
const db = require('./DB/conexion.js');
const verifyToken = require('./back/verifyToken.js');
const index = require('./back/index.js');

// Run express.
const app = express();

// Define CORS options:
var corsOptions = {
    origin: '*',
    exposedHeaders: '*'
}

// Define port
const port = process.env.port || 8080;

// Define the url used with a router inside backtest file. - These are middlewares.
app.use(express.json()) // This middleware is to accept json in the body request.
app.use('/', index)
app.use('/api', verifyToken, cors(corsOptions), backtest);
app.use('/auth', cors(corsOptions), auth); 


// Executes the back
app.listen(port, () => {
    console.log(`Server Running in port: ${port}`);
});
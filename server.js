'use strict';

//Set enviroment
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./persistence/database/database-connection');

//Runs database conection
database();

const passportConfig = require('./api/twitter/config/passport-config');

//Setup configuration for twitter authentication
passportConfig();

const app = express();

//Enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authenticationRoute = require('./api/twitter/routes/authentication-route');
const searchRoute = require('./api/twitter/routes/search-route');

//Config Twitter authentication routes
app.use('/api/v1/auth', authenticationRoute);

//Config twitter seacrh for hashtags route
app.use('/api/v1/search', searchRoute);

//Handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
});

//Server port
const port = process.env.PORT;

//Listening
app.listen(port, () => console.log(`Server is up and runing on port ${port}`));
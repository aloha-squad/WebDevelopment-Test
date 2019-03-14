'use strict';

const mongoose = require('mongoose');

//Connects with database
module.exports = () => {
    let developmentDatabaseUrl = 'mongodb://admin:abcd1234@ds113866.mlab.com:13866/web-development-test';
    let mongoDB = process.env.MONGODB_URI || developmentDatabaseUrl;
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    let database = mongoose.connection;
    database.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
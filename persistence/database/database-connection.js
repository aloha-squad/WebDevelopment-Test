'use strict';

const mongoose = require('mongoose');
const circuitBreaker = require('opossum');

const breaker = circuitBreaker(() => {
    let mongoDB = process.env.MONGODB_URI;
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
}, {
    timeout: 5000, // If our function takes longer than 5 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
});

// if searchHandler.searchForHashtag starts to fail, firing the breaker
// will trigger our fallback function
breaker.fallback(() => '[MongoDB Service] - Sorry, out of service right now');
breaker.on('fallback', (result) => {
    console.log(result);
});

//Connects with database
module.exports = () => {
    breaker.fire();
    //let database = mongoose.connection;
    //database.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
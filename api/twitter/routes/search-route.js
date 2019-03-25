'use strict';

const express = require('express');
const circuitBreaker = require('opossum');

const searchHandler = require('../handlers/search-handler');

const router = express.Router();

//Circuit breaker config
const breaker = circuitBreaker(searchHandler.searchForHashtag, {
    timeout: 10000, //If our function takes longer than 10 seconds, trigger a failure
    errorThresholdPercentage: 50, //When 50% of requests fail, trip the circuit
    resetTimeout: 30000 //After 30 seconds, try again
});

//If searchHandler.searchForHashtag starts to fail, firing the breaker will trigger our fallback function
breaker.fallback(() => '[Search Service] - Sorry, out of service right now');
breaker.on('fallback', (result) => {
    console.log(result);
});

router.post('/hashtag', (req, res, next) => {
    return breaker.fire(req, res, next);
});

module.exports = router;
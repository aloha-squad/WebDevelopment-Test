const express = require('express');
const app = express();
const Twit = require('twit')
const apiKeyWatson = require('../config/config.json').Watson.apikey;

// var fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: apiKeyWatson,
    version: '2018-04-05',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

exports.nodeWatsonAnalyze = function (request, response) {
    let textToWatson = request.body.text;
    console.log(textToWatson);

    return new Promise(function (resolve, reject) {
        nlu.analyze({
                text: textToWatson,
                features: {
                    sentiment: {},
                    emotion: {},
                    keywords: {}
                }
            },
            function (err, response) {
                if (err) {
                    console.log('error:', err);
                } else {
                    // console.log(JSON.stringify(response, null, 2));
                    resolve(response);
                }
            }
        )
    })
}
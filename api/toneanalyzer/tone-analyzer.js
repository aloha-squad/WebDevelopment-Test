'use strict';

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

//Config tone analyzer
const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    iam_apikey: process.env.IAM_APIKEY,
    url: process.env.IAM_URL
});

//Get the text from request, sends to tone analyzer api and returns the result on data
exports.getTone = (req) => {
    return new Promise(
        (resolve, reject) => {
            toneAnalyzer.tone({
                tone_input: req.text,
                content_type: 'text/plain'
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    id: req.id,
                    tone: data.document_tone.tones,
                    coordinates: {
                        lat: req.coordinates.coordinates[1],
                        lng: req.coordinates.coordinates[0]
                    }
                });
            });
        }
    );
};
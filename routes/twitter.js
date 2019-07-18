const express = require('express');
const app = express();
const Twit = require('twit')
const config = require('../config/config.json');

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

var nodeTwitter = new Twit({
    consumer_key: config.Twitter.consumer_key,
    consumer_secret: config.Twitter.consumer_secret,
    access_token: config.Twitter.access_token,
    access_token_secret: config.Twitter.access_token_secret
})

exports.nodeTwitterApi = function (request, response) {
    var paramsSearch = {
        q: request.body.searchTerm,
        count: 2
    };

    nodeTwitter.get('search/tweets', paramsSearch, function (err, data) {
        console.log(data)
        response.status(200).send({success : "Sucesso"});
    })
}
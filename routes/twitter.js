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
        q: '%23' + request.body.searchTerm,
        lang: 'en',
        count: 4,
        tweet_mode: 'extended'
    };

    nodeTwitter.get('search/tweets', paramsSearch, function (err, data) {
        for(var key in data.statuses){
            if(data.statuses[key].retweeted_status) {data.statuses[key].full_text = data.statuses[key].retweeted_status.full_text;}
            console.log(data.statuses[key])
        }
        
        if(err) {
            console.log(err)
            response.status(400).send({
				error: err
			});
        }
        else{
            response.status(200).send({success : data});
        }  
    })
}
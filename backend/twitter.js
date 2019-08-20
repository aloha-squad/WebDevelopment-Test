const fileJSON = require('./fileJSON')
const Twit = require('twit');
const config = require('../src/config');
const T = new Twit(config);
const server = require('./server')

module.exports = function main(hashtag){
    const geocode = require('./geocode');
    console.log("TWITTER OK");
    
    const query = hashtag
    
    let params = {
        q: query,
        count: 100,
        result_type: 'recent'
    }

    T.get('search/tweets', params, gotData);

    //Get the Username, Location and the Tweet itself from the query and write into a JSON file
    function gotData(err, data, response){
        const tweetJSON = require('../src/tweets.json');
        let username;
        let location;
        let text;
        let tweets = data.statuses; 
    
        for (let i = 0; i < tweets.length; i++) {
            if (tweets[i].user.location != "") {
                username = tweets[i].user.screen_name;
                location = tweets[i].user.location;
                text = tweets[i].text;
                tweetJSON.statuses.push({
                    "username" : username,
                    "location" : location,
                    "text" : text
                });
            }   
        }
        fileJSON("write", tweetJSON, "../src/tweets");
        console.log("JSON OK");
        
    }
    geocode("GEOCODE OK")
    
}

const Twitter = require('twitter');

const twitter_api_key = require('../config/twitter-api-keys');

const client = new Twitter({
  consumer_key: twitter_api_key.TWITTER_CONSUMER_KEY,
  consumer_secret: twitter_api_key.TWITTER_CONSUMER_SECRET,
  access_token_key: twitter_api_key.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: twitter_api_key.TWITTER_ACCESS_TOKEN_SECRET
});

exports.searchForHashtag = function (req, res, next) {
  client.get('search/tweets', req.body, function (error, tweet, response) {
    if (error) throw (error);

    res.send(tweet);
  });
}
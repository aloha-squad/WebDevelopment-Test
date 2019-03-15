const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Returns only tweets that contains coordinates attribute
getTweetCoords = (tweets) => {
  const tweetsCoord = [];
  tweets.map((tweet) => {
    if (tweet.coordinates !== null) {
      tweetsCoord.push(
        {
          id: tweet.id,
          coordinates: {
            lat: tweet.coordinates.coordinates[1],
            lng: tweet.coordinates.coordinates[0]
          }
        }
      );
    }
  });

  return tweetsCoord;
}

exports.searchForHashtag = function (req, res, next) {
  client.get('search/tweets', req.body, function (error, tweet, response) {
    if (error) throw (error);

    const tweetsCoord = getTweetCoords(tweet.statuses);
    res.send(tweetsCoord);
  });
}
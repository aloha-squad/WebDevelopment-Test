const Twitter = require('twitter');

const toneAnalyzer = require('../../toneanalyzer/tone-analyzer');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Returns only tweets that contains coordinates attribute
getTweetCoordsAndTone = (tweets) => {
  const tweetWithCoords = [];

  //Only tweets that have coordinates will be add to the array
  tweets.map((tweet) => {
    if (tweet.coordinates !== null) {
      tweetWithCoords.push(tweet);
    }
  });

  //Generating promises of the tweets
  const promises = tweetWithCoords.map((tweet) => {
    return toneAnalyzer.getTone(tweet);
  });

  return Promise.all(promises);
};

//Sends a request to twitter api to get the tweets that contains the query parameter
search = (query) => {
  return new Promise((resolve, reject) => {
    twitterClient.get('search/tweets', query, (error, data, response) => {
      if (error) reject(error);

      resolve(data.statuses);
    });
  });
};

exports.searchForHashtag = async (req, res, next) => {
  try {
    //Search for tweets that contains the hashtag
    let tweets = await search(req.body);
    //Get coordinates and tone from the tweets
    let response = await getTweetCoordsAndTone(tweets);
    //Sends back the result
    res.send(response);
  } catch (e) {
    console.warn('Exception in searchForHashtag method: ' + e);
    //Returns a empty array in case of exceptions
    res.send([]);
  }
};
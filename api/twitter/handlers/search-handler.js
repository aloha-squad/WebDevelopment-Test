const Twitter = require('twitter');

const toneAnalyzer = require('../../toneanalyzer/tone-analyzer');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Returns only tweets that contains coordinates attribute
getTweetCoordsAndTone = async (tweets) => {
  const tweetWithCoords = [];

  //Only tweets that have coordinates will be add to the array
  tweets.map((tweet) => {
    if (tweet.coordinates !== null) {
      tweetWithCoords.push(tweet);
    }
  });

  //Generating promises of the tweets
  const promises = tweetWithCoords.map(async (tweet) => {
    let data = await toneAnalyzer.getTone(tweet);
    return data;
  });

  return await Promise.all(promises);
}

//send a request to twitter api to get the tweets that contains the query in req.body
search = (req, next) => {
  return new Promise((resolve, reject) => {
    twitterClient.get('search/tweets', req.body, (error, data, response) => {
      if (error) reject(error);

      resolve(data.statuses);
    });
  });
};

//Search for the hashtag bundle
exports.searchForHashtag = async (req, res, next) => {
  let tweets;

  //Do the searh on twitter api
  await search(req).then((response) => {
    //Search well succedded
    return response;
  }, (err) => {
    //Twitter search error
    console.error('Twitter seach error: ' + err);
    next(err);
  }).then(async (response) => {
    //Get tone and coords of the tweets that coords !== null
    tweets = await getTweetCoordsAndTone(response);
    //Send the result
    res.send(tweets);
  }, (err) => {
    //Tone analyzer error
    console.error('Tone Analyzer error: ' + err);
    next(err);
  }).catch(e => console.log('Exception: ' + e));;
}
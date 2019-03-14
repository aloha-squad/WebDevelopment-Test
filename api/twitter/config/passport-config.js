'use strict';

const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');

const api_keys = require('./api-keys');
const User = require('../../../persistence/model/user-model');

module.exports = () => {
    //Set the passport strategy as a TwitterTokenStrategy
    passport.use(new TwitterTokenStrategy({
        consumerKey: api_keys.TWITTER_CONSUMER_KEY,
        consumerSecret: api_keys.TWITTER_CONSUMER_SECRET
    }, (token, tokenSecret, profile, done) => {
        User.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
            return done(err, user);
        });
    }
    ));
}
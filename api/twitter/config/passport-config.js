'use strict';

const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');

const User = require('../../../persistence/model/user-model');

module.exports = () => {
    //Set the passport strategy as a TwitterTokenStrategy
    passport.use(new TwitterTokenStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET
    }, (token, tokenSecret, profile, done) => {
        User.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
            return done(err, user);
        });
    }
    ));
}
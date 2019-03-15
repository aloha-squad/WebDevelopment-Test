'use strict';

const express = require('express');
const request = require('request');
const passport = require('passport');

const jwtHandler = require('../handlers/jwt-handler');
const twitter_api_keys = require('../config/twitter-api-keys');

const router = express.Router();

//Handle the authentication routes
router.route('/twitter/reverse')
  .post(function (req, res) {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: twitter_api_keys.TWITTER_CONSUMER_KEY,
        consumer_secret: twitter_api_keys.TWITTER_CONSUMER_SECRET
      }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      let jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });

router.route('/twitter')
  .post((req, res, next) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: twitter_api_keys.TWITTER_CONSUMER_KEY,
        consumer_secret: twitter_api_keys.TWITTER_CONSUMER_SECRET,
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitter-token', { session: false }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    //Prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  }, jwtHandler.generateToken, jwtHandler.sendToken);

module.exports = router;
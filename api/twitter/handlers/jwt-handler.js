'use strict';

const jwt = require('jsonwebtoken');

//Handle the jwt used in authentication
module.exports = {
  generateToken: (req, res, next) => {
    req.token = jwt.sign({
      id: req.auth.id //User ID
    }, 'my-secret', {
        expiresIn: 60 * 120 //7200 seconds -> 120 min
      }
    );
    return next();
  },

  sendToken: (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  }
};
'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
    required: true,
    select: false
  }
});

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

UserSchema.statics.upsertTwitterUser = function (token, tokenSecret, profile, callback) {
  let that = this;
  return this.findOne({
    'twitterProvider.id': profile.id
  }, function (err, user) {
    if (!user) { //No user was found, create a new one
      let newUser = new that({
        twitterProvider: {
          id: profile.id,
          token: token,
          tokenSecret: tokenSecret
        }
      });

      newUser.save(function (error, savedUser) {
        if (error) {
          console.error(error);
        }
        return callback(error, savedUser);
      });
    } else {
      return callback(err, user);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
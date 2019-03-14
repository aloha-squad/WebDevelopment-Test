'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  twitterProvider: {
    type: {
      id: String, 
      token: String
    },
    required:true,
    select: false
  }
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

//If the user does not exists on database
UserSchema.statics.upsertTwitterUser = function (token, tokenSecret, profile, cb) {
  let that = this;
  return this.findOne({
    'twitterProvider.id': profile.id
  }, function (err, user) {
    // no user was found, create a new one
    if (!user) {
      let newUser = new that({
        twitterProvider: {
          id: profile.id,
          token: token,
          tokenSecret: tokenSecret
        }
      });

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
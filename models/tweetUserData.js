const mongoose = require('mongoose');

const tweetUserDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_screen_name: {type: String, required: true},
    coordinates: {type: Object, required: true},
    user_text: {type: String, required: true}
});

module.exports = mongoose.model('tweetUserData', tweetUserDataSchema);

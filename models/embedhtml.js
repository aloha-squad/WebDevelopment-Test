const mongoose = require('mongoose');

const embedhtmlSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    finder: {type: String, required: true},
    embedhtml: {type: String, required: true}

});

module.exports = mongoose.model('embedhtml', embedhtmlSchema);
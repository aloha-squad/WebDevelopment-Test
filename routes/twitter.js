const express = require('express');
const app = express();
const Twit = require('twit')

const nodeTwitter = new Twit({
    consumer_key: 'JEfRUKgIc6VjjYBD9c4zR8XBi',
    consumer_secret: '2azN3MLX3uRKcH4vdP7uIomDK2g3Ph6GguYl7x1W2wJnbBacyY',
    access_token: '1151608258811052033-wLXs4QgTpxMyCFo9aVuCWBCsrWxzJw',
    access_token_secret: 'w7RgtAkrJrEJqZ6xf6xMlSOyKYSfuKQzmTrfRkGPJVdno'
})

var paramsSearch = {
    q: 'e3',
    count: 2
};

exports.nodeTwitterApi = function () {
    nodeTwitter.get('search/tweets', paramsSearch, function (err, data, response) {
        console.log(data)
    })
}
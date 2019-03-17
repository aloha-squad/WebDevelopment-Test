'use strict';

const express = require('express');

const searchHandler = require('../handlers/search-handler');

const router = express.Router();

router.post('/hashtag', searchHandler.searchForHashtag);

module.exports = router;
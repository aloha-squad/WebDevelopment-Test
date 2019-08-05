const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://tweetlocator.mybluemix.net/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/mensagem', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://tweetlocator.mybluemix.net/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send({ express: 'Hi! I was created for development test!' });
});

app.get('/', (req, res) => {
  res.send({ express: `Hello! You're in GeoFinder's Home Page!`});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
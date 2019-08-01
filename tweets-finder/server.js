const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/mensagem', (req, res) => {
  res.send({ express: 'Hi! I was created for development test!' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
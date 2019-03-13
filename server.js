const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Cors());

//Server port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and runing on port ${port}`));
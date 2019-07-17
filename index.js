const express = require('express');
const cookieParser = require('cookie-parser');
const app = express().use(function (req, res, next) {
	if (req.header('x-forwarded-proto') == 'http') {
		res.redirect(301, 'https://' + 'mywebsite.herokuapp.com' + req.url)
		return
	}
	next()
});
const server = require('https').createServer(app);
const porta = process.env.PORT || 3000;

// General Setup
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
//---

// HandleBars - Template Engine
const handleBars = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', handleBars({
	defaultLayout: "index"
}));
app.set('view engine', 'handlebars');
//---

const twitterApi = require('./routes/twitter');

/** Pages Routes Website **/
app.get('/home', function (request, response) {
    twitterApi.nodeTwitterApi();

	response.render('home', {
		bodyId: "home",
		style: ['/css/main.css'],
		javascript: []
	});
});
/** END Pages Routes **/

//All Routes
app.get('*', function (request, response) {
	response.render('home', {
		bodyId: "home",
		style: ['/css/main.css'],
		javascript: []
	});
});

app.listen(porta, function () {
	console.log("server on in: " + porta)
});
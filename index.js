const express = require('express');
const cookieParser = require('cookie-parser');
const app = express().use(function (req, res, next) {
	if (req.header('x-forwarded-proto') == 'http') {
		res.redirect(301, 'https://' + 'webdevelopment-caio.herokuapp.com' + req.url)
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
	defaultLayout: "index",
	helpers: {
        is: function (v1, operator, v2, options) { 
			switch (operator) {
				case '==':
					return (v1 == v2) ? options.fn(this) : options.inverse(this);
				case '===':
					return (v1 === v2) ? options.fn(this) : options.inverse(this);
				case '!=':
					return (v1 != v2) ? options.fn(this) : options.inverse(this);
				case '!==':
					return (v1 !== v2) ? options.fn(this) : options.inverse(this);
				case '<':
					return (v1 < v2) ? options.fn(this) : options.inverse(this);
				case '<=':
					return (v1 <= v2) ? options.fn(this) : options.inverse(this);
				case '>':
					return (v1 > v2) ? options.fn(this) : options.inverse(this);
				case '>=':
					return (v1 >= v2) ? options.fn(this) : options.inverse(this);
				case '&&':
					return (v1 && v2) ? options.fn(this) : options.inverse(this);
				case '||':
					return (v1 || v2) ? options.fn(this) : options.inverse(this);
				default:
					return options.inverse(this);
			}
		 }
    },
}));
app.set('view engine', 'handlebars');
//---

const twitterApi = require('./routes/twitter');
const watsonApi = require('./routes/watson');

/** Pages Routes Website **/
app.get('/home', function (request, response) {
	response.clearCookie('user');
	response.clearCookie('displayName');
	response.clearCookie('userImage');

	response.render('home', {
		homepage: true,
		style: ['/css/main.css', '/css/home.css'],
		javascript: []
	});
});

app.get('/app', function (request, response) {
	if (typeof request.cookies.user == 'undefined')
		response.redirect('/home');
	else {
		response.render('app', {
			pageId: "app",
			pageName: "Busca Twitter",
			username: request.cookies.user,
			displayName: request.cookies.displayName,
			userImage: request.cookies.userImage,
			watsonFeelings: [{
					en: "angry",
					title: "Raiva",
					icon: "angry"
				}, {
					en: "disgust",
					title: "Indignação",
					icon: "tired"
				}, {
					en: "fear",
					title: "Medo",
					icon: "sad-cry"
				},
				{
					en: "joy",
					title: "Felicidade",
					icon: "smile"
				}, {
					en: "sadness",
					title: "Tristeza",
					icon: "frown"
				}
			],
			style: ['/css/main.css', '/css/app.css','/vendor/owl-carousel/owl.carousel.min.css','/vendor/owl-carousel/owl.theme.default.min.css'],
			javascript: ['/js/app.js', '/js/watson-events.js','/vendor/owl-carousel/owl.carousel.min.js']
		});
	}
});
/** END Pages Routes **/

/** Login Twitter **/
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');

app.use(session({
	secret: 'secretSession',
	resave: true,
	saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


passport.use(
	new TwitterStrategy({
			consumerKey: 'JEfRUKgIc6VjjYBD9c4zR8XBi',
			consumerSecret: '2azN3MLX3uRKcH4vdP7uIomDK2g3Ph6GguYl7x1W2wJnbBacyY',
			callbackURL: '/twitter/return'
		},
		function (token, tokenSecret, profile, done) {
			return done(null, profile)
		}
	));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.get('/twitter/login', passport.authenticate('twitter'))

app.get('/twitter/return', passport.authenticate('twitter', {
	failureRedirect: '/home'
}), function (request, response) {
	if (request.isAuthenticated(request, response)) {
		// console.log(request.user)
		response.cookie('user', request.user.username);
		response.cookie('displayName', request.user.displayName);
		response.cookie('userImage', request.user._json.profile_image_url_https);

		response.redirect('/app');
	}
})
/** END Login Twitter **/

// Search Term Post for tweets Api
app.post('/searchTweets', function (request, response) {
	twitterApi.nodeTwitterApi(request, response);
})

// Route to receive the text and send to watson api to analyze
app.post('/watson/analyze', function (request, response) {
	watsonApi.nodeWatsonAnalyze(request, response).then(data => {
		// console.log(data);
		response.status(200).send({
			success: data
		});
	})
})

/** Routes Db Sql **/
const sqlConnection = require('./routes/db');
const conSql = sqlConnection.sqlConfig();

app.get('/get/ranking', function (request, response) {
	sqlConnection.getRanking(request, response);
})

app.post('/change/ranking', function (request, response) {
	sqlConnection.changeRanking(request, response);
})
/** END Routes Db Sql **/

//All Routes and 404 page redirects to here
app.get('*', function (request, response) {
	// response.clearCookie('user');
	// response.clearCookie('displayName');

	response.render('home', {
		homepage: true,
		style: ['/css/main.css', '/css/home.css'],
		javascript: []
	});
});

app.listen(porta, function () {
	console.log("server on in: " + porta)
});
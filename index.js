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
const watsonApi = require('./routes/watson');

/** Pages Routes Website **/
app.get('/home', function (request, response) {
    response.clearCookie('user');
    response.clearCookie('displayName');
    
	response.render('home', {
        bodyId: "home",
		style: ['/css/main.css'],
		javascript: []
	});
});

app.get('/app', function (request, response) {
    if (typeof request.cookies.user == 'undefined')
		response.redirect('/home');
    else{
        response.render('app', {
            bodyId: "app",
            username: request.cookies.user,
            displayName: request.cookies.displayName,
            style: ['/css/main.css','/css/app.css'],
            javascript: ['/js/app.js']
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
			callbackURL: 'http://localhost:3000/twitter/return'
		},
		function (token, tokenSecret, profile, done) {
            return done(null,profile)
		}
	));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/twitter/login', passport.authenticate('twitter'))

app.get('/twitter/return', passport.authenticate('twitter',{
    failureRedirect: '/home'
}),function(request,response){
    if (request.isAuthenticated(request,response)) {
        // console.log(request.user)
        response.cookie('user', request.user.username);
        response.cookie('displayName', request.user.displayName);
        
		response.redirect('/app');
	}
})
/** END Login Twitter **/

// Search Term Post for tweets Api
app.post('/searchTweets', function(request,response){
    twitterApi.nodeTwitterApi(request,response);
})

// Route to receive the text and send to watson api to analyze
app.post('/watson/analyze', function(request,response){
	watsonApi.nodeWatsonAnalyze(request,response).then(data => {
		// console.log(data);
		response.status(200).send({
			success: data
		});
	})
})

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
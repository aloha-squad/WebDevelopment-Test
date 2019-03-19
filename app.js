const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const sess = require('express-session')
const BetterMemoryStore = require('session-memory-store')(sess)
const Twit = require('twit')
const env = require('./env')

const twitter = new Twit({
  consumer_key: env.TWITTER_CONSUMER_KEY,
  consumer_secret: env.TWITTER_CONSUMER_SECRET,
  access_token: env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET
})

passport.use(new TwitterStrategy({
  consumerKey: env.TWITTER_CONSUMER_KEY,
  consumerSecret: env.TWITTER_CONSUMER_SECRET,
  callbackURL: env.TWITTER_CALLBACKPAGE
},
  (token, tokenSecret, profile, done) => {
    done(null, profile);
  }
))

// Serialize and deserialize user information
passport.serializeUser((user, callback) => {
  callback(null, user)
})
passport.deserializeUser((object, callback) =>{
  callback(null, object)
})

const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Add session cofig
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true })
app.use(sess({
  name: 'JSESSION',
  secret: 'MYSECRETISVERYSECRET',
  store:  store,
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

// Search for tweets and compose a list with its locations
function searchTweets(hashtag) {
  location = []
  twitter.get('search/tweets', {q: '%23' + hashtag}, data = (err, data, response) => {
    for(i = 0; i < data['statuses'].length; i++){
      location.push(data['statuses'][i]['user']['location'])
    }
    return location
  })
}

// Add route '/'
app.get('/', (req, res) => {
  res.render('index.pug', {user: req.user, hashtag: req.body.hashtag});
})

app.post('/', (req, res) => {
  var hashtag = req.body.hashtag
  searchTweets(hashtag)
})

// Add twitter login and return methoods
app.get('/twitter/login', passport.authenticate('twitter'))

app.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect : '/'
}), 
  (req, res) => {
    res.redirect('/')
  })

module.exports = app
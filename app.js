const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');
const config = require('./config');
const mongoose = require('mongoose');

const Embedhtml = require('./models/embedhtml');
const TweetUserData = require('./models/tweetUserData');

mongoose.connect('mongodb://localhost/embedhtml')

var Twit = require('twit');
var T = new Twit(config);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('json spaces', 1);
//  ------ PASSPORT CONFIG TO AUTHORIZE LOGIN------ 
passport.use(new Strategy({
    consumerKey: config.consumer_key,
    consumerSecret: config.consumer_secret,
    callbackURL: config.callbackURL
}, function (token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function (user, callback) {
    callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
})
//  ------ FRONT-END EJS------ 

app.set('view engine', 'ejs');

//  ------ EXPRESS PUBLIC + EXPRESS SESSION FOR PASSPORT----- 

app.use(express.static('./public'));
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }));

//  ------ INITIALIZE PASSPORT------ 
app.use(passport.initialize());
app.use(passport.session());

//  ------ index.ejs------ 
app.get('/', (req, res) => {
    res.render('index', { user: req.user, statuses: false, dataFromUser: false });
});

//  ------ PASSPORT MIDDLEWARE ------ 
app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter'), function (req, res) {
    res.redirect('/');
})

//  ------ SEARCH FOR HASHES ------ 
app.post('/post', (req, res,next) => {
    console.log(req.body.finder);
    if(req.body.finder ==''){
        res.redirect('/');
    }
    else{
    T.get('search/tweets', { q: req.body.finder, count: 100 }, function (err, data, response) {
        for (var i = 0; i < data.statuses.length; i++) {
            if (data.statuses[i].geo !== null) {

                //  ------ SAVE USER_NAME and COORDIANTES at TweetUserData------ 
                const userData = new TweetUserData({
                    _id: new mongoose.Types.ObjectId(),
                    user_screen_name: data.statuses[i].user.screen_name,
                    coordinates: data.statuses[i].geo.coordinates

                });
                userData
                    .save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                T.get('statuses/oembed', { url: 'https://twitter.com/' + data.statuses[i].user.screen_name + '/status/' + data.statuses[i].id_str }, (err, data, response) => {
                
                //  ------ SAVE FINDER and EMBEDHTML at Embedhtml------ 
                    const embed = new Embedhtml({
                        _id: new mongoose.Types.ObjectId(),
                        finder: req.body.finder,
                        embedhtml: data.html
                    });
                    embed
                        .save()
                        .then(result => {
                            console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                });

            }
        }
    });
    next();}
},(req,res)=>{
    res.redirect('/');
});

//  ------ LOAD DATA TO FRONT END ------ 
app.get('/load',(req,res,next)=>{

//  ------ VERIFICATION BEFORE LOAD ------ 
    Embedhtml.find().exec()
        .then(verifydoc => {
            return verifydoc
        }).then(verifydoc2 =>{
            console.log(verifydoc2);
            if(verifydoc2.length==0){
            res.redirect('/');}
            else{
                next();
            }
        });
}
,(req, res) => {
    //  ------ GET ALL EMBEDHTML DATA------ 
    Embedhtml.find().exec()
        .then(doc => {
            return doc
        })
        .then(result => {
            var embedToRender = [];
            result.forEach(element => {
                embedToRender.push(element);
            });
            return embedToRender;
        })
        .then(result2 => {
            console.log(result2);

            //  ------ GET ALL TWEETUSERDATA------ 
            TweetUserData.find().exec()
                .then(doc2 => {
                    return doc2;
                })
                .then(result3 => {
                    var dataFromUser = [];
                    result3.forEach(element2 => {
                        dataFromUser.push(element2);
                    });
                    //  ------ SEND TO FRONT-END ----- 
                    res.render('index', { user: req.user, statuses: result2, dataFromUser: dataFromUser })
                })
                .then(lelele => {
                    //  ------ DELETE ALL DATA FROM BOTH COLLECTIONS------ 
                    Embedhtml.deleteMany({}).exec().then(doc => {
                        console.log("Embedhtml");
                        console.log(doc);
                        TweetUserData.deleteMany({}).exec().then(doc => {
                            console.log("TweetUserData");
                            console.log(doc);
                        });
                    });
                });
        });

});

//  ------ Errors Handlers ------ 
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
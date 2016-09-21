//Load app dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    expressLayouts = require('express-ejs-layouts'),
    path = require('path'),
    http = require('http');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var passport = require('passport');
var flash = require('connect-flash');


var app = express();

//Configure: bodyParser to parse JSON data
//           methodOverride to implement custom HTTP methods
//           router to crete custom routes

app.enable('view cache');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, 'app/views')); // defaults to 'layout'

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(passport.initialize());

// required for passport session
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true
}));

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

//Sample routes are in a separate module, just for keep the code clean
routes = require('./routes/routes')(app);

mongoose.Promise = global.Promise;
//Connect to the MongoDB test database
mongoose.connect('mongodb://localhost/demo_db');
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
    next();

});


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



//App routes  
module.exports = function (app) {

    var express = require('express');
    var router = express.Router();
    var passport = require('passport');
    var user = require('../app/controllers/user');
    var utilities = require('../app/controllers/utilities');
    var signals = require('../app/controllers/signals');
    var doctors = require('./doctor');


    /*
     * BASE LOGIN
     */
    app.get('/login', utilities.index); //petición get para acceder a la página de login
    app.post('/login', user.authenticate); //petición post para hacer el login
    app.post('/signup', user.signup); //petición post para registrar un usuario
    app.post('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/register', utilities.login);
    app.get('/homein', utilities.homein);

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    /*
     * HOME PAGE
     */
    app.get('/', utilities.index);

    /*
     * DEMO
     */
    app.get('/signals', signals.index);

    /*
     * DOCTORSAPI
     */
    app.use('/doctors', doctors);


}
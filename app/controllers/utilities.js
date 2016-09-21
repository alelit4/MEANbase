/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');


/* Home View */
exports.index = function(req, res) {
    res.render('login/home');
    console.log(req.isAuthenticated());
};

/* Login View */
exports.login = function(req, res) {
    if(req.isAuthenticated()){
        res.render('login/logout');
    }
    else{res.render('login/login');}

};

/* Search View */
exports.homein = function(req, res) {
    if (req.isAuthenticated()){
        console.log("is autenticated ");
        res.render('homein');
    }else{
        console.log("is NO autenticated ");
        res.render('login/home');
    }
};

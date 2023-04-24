require('dotenv').config();
require('./api/models/dbconnection.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes')
var bodyparser = require('body-parser');

app.set('port',process.env.PORT || 3010);

//Middleware - Logging requests that comes in
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/api/request-management', routes);

var server = app.listen(app.get('port'), function (result) {
    var port = server.address().port;
    console.log('It runs on ' + port);
});
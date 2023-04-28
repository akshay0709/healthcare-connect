var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var httpProxy = require('express-http-proxy-is');
var jwt = require('jsonwebtoken');
const config = require('./config');
require('dotenv').config();
app.set('port',process.env.PORT || 3000);
const secretKey = process.env.SECRET_KEY;

//Register service URL
var registerProxy = httpProxy(config.registerProxy || 'http://localhost:3001/api/register/');
var authenticationProxy = httpProxy(config.authenticationProxy || 'http://localhost:3002/api/authenticate');
var userInformationProxy = httpProxy(config.userInformationProxy || 'http://localhost:3003/api/users');
var entityInformationProxy = httpProxy(config.entityInformationProxy || 'http://localhost:3004/api/entities');
var appointmentProxy = httpProxy(config.appointmentProxy || 'http://localhost:3005/api/appointment-management');
var searchProxy = httpProxy(config.searchProxy || 'http://localhost:3006/api/search');
var eventProxy = httpProxy(config.eventProxy || 'http://localhost:3007/api/event-management');
var emailProxy = httpProxy(config.emailProxy || 'http://localhost:3008/api/broadcast-service');
var inventoryProxy = httpProxy(config.inventoryProxy || 'http://localhost:3009/api/inventory-management');
var requestProxy = httpProxy(config.requestProxy || 'http://localhost:3010/api/request-management');

//Middleware - Logging requests that comes in
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});

app.use(cors());

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//Calls to Register Microservice
app.post('/api/register*', function(request,response){
    console.log("Entered register/user function");
    registerProxy(request, response);
});

//Calls to Authentication Microservice
app.post('/api/authenticate*', function(request, response){
    console.log('Entered login-user function');
    authenticationProxy(request, response);
});

app.get('/api/authenticate*', function(request, response){
    console.log('Entered login-user function');
    authenticationProxy(request, response);
});

app.put('/api/authenticate*', function(request, response){
    console.log('Entered login-user function');
    authenticationProxy(request, response);
});

app.get('/api/search*', validuser, function(request, response){
    console.log('Entered search function');
    searchProxy(request, response);
});

//Calls to User Information Microservice
app.get('/api/users*', protected, function(request, response){
    console.log('Entered userinfo function');
    userInformationProxy(request,response);
});
app.put('/api/users*',protected, function(request, response){
    console.log('Entered userinfo function');
    userInformationProxy(request,response);
});
app.delete('/api/users*', protected, function(request, response){
    console.log('Entered userinfo function');
    userInformationProxy(request,response);
});

//Calls to Entity Information Microservice
app.get('/api/entities*', protected, function(request, response){
    console.log('Entered userinfo function');
    entityInformationProxy(request,response);
});
app.put('/api/entities*', protected, function(request, response){
    console.log('Entered userinfo function');
    entityInformationProxy(request,response);
});
app.delete('/api/entities*', protected, function(request, response){
    console.log('Entered userinfo function');
    entityInformationProxy(request,response);
});

//Calls to Appointment Microservice
app.get('/api/appointment-management*', protected, function(request, response){
    console.log('Entered appointment management function');
    appointmentProxy(request, response);
});

app.post('/api/appointment-management*', validuser, function(request, response){
    console.log('Entered appointment management function');
    appointmentProxy(request, response);
});

app.put('/api/appointment-management*', protected, function(request, response){
    console.log('Entered appointment management function');
    appointmentProxy(request, response);
});

app.delete('/api/appointment-management*', protected, function(request, response){
    console.log('Entered appointment management function');
    appointmentProxy(request, response);
});

//Calls to Events Microservice
app.get('/api/event-management*', function(request, response){
    console.log('Entered eventManagement function');
    eventProxy(request, response);
});

app.post('/api/event-management*', validuser, function(request, response){
    console.log('Entered eventManagement function');
    eventProxy(request, response);
});

app.put('/api/event-management*', protected, function(request, response){
    console.log('Entered eventManagement function');
    eventProxy(request, response);
});

app.delete('/api/event-management*', protected, function(request, response){
    console.log('Entered eventManagement function');
    eventProxy(request, response);
});

//Calls to Email Microservice  (Protect this with role - incomplete)
app.post('/api/broadcast-service*', validuser, function(request, response){
    console.log('Entered broadcastService fucntion');
    emailProxy(request, response);
});

app.get('/api/broadcast-service*', protected, function(request, response){
    console.log('Entered broadcastService function');
    emailProxy(request, response);
});

//Calls to Inventory Microservice
app.post('/api/inventory-management*', validuser, function(request, response){
    console.log('Entered inventoryService function');
    inventoryProxy(request, response);
});

app.get('/api/inventory-management*', protected, function(request, response){
    console.log('Entered inventoryService function');
    inventoryProxy(request, response);
});

app.put('/api/inventory-management*', protected, function(request, response){
    console.log('Entered inventoryService function');
    inventoryProxy(request, response);
});

app.delete('/api/inventory-management*', protected, function(request, response){
    console.log('Entered inventoryService function');
    inventoryProxy(request, response);
});

//Calls to Request Microservice
app.post('/api/request-management*', validuser, function(request, response){
    console.log('Entered requestService function');
    requestProxy(request, response);
});

app.get('/api/request-management*', protected, function(request, response){
    console.log('Entered requestService function');
    requestProxy(request, response);
});

app.put('/api/request-management*', protected, function(request, response){
    console.log('Entered requestService function');
    requestProxy(request, response);
});

app.delete('/api/request-management*', protected, function(request, response){
    console.log('Entered requestService function');
    requestProxy(request, response);
});


function protected(request, response, next){
    console.log('Entered function to strip jwt');
    console.log(request.method, request.url);
    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        console.log('JWT is present');
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        request.token = bearerToken;
        jwt.verify(request.token, secretKey, function(error, authData){
            if(error){
                response
                    .status(403)
                    .json({'message': 'Forbidden'})
            } else{
                console.log(authData);
                if(request.url.includes(authData.username)){
                    next();
                } else{
                    response
                        .status(403)
                        .json({'message': 'Forbidden'})
                }
            }
        });
    } else{
        response
            .status(403)
            .json({'message': 'Forbidden'})
    }
}

function validuser(request, response, next){
    console.log('Entered validuser function');
    console.log(request.method, request.url);
    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        console.log('jwt present');
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        request.token = bearerToken;
        jwt.verify(request.token, secretKey, function(error, authData){
            if(error){
                response
                    .status(403)
                    .json({'message': 'Forbidden'})
            } else{
                console.log(authData);
                if(authData.role === 'user' || authData.role == 'entity'){
                    next();
                } else{
                    response
                        .status(403)
                        .json({'message': 'Forbidden'})
                }
            }
        });
    } else {
        response
            .status(403)
            .json({'message' : 'Forbidden'})
    }
}

var server = app.listen(app.get('port'), function (result) {
    var port = server.address().port;
    console.log('It runs on ' + port);
});
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserCredential = mongoose.model('UserCredential');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(request, response){
    console.log('Registering user');
    console.log(request.body);
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    var username = request.body.username;
    var street = request.body.street;
    var city = request.body.city;
    var email = request.body.email;
    var state = request.body.state;
    var country = request.body.country;
    var zip = request.body.zip;

    var username = request.body.username;
    var password = request.body.password;

    User.create({
       firstname: firstname,
       lastname: lastname,
       username: username,
       street: street,
       city: city,
       email: email,
       state: state,
       country: country,
       zip: zip 
    }, function(err, user){
        if(err){
            console.log(err);
            response.status(400).json(err);
        } else{
            UserCredential.create({
                username: username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            }, function(error, usercred){
                if(error){
                    console.log(error);
                    response.status(400).json(error);
                } else{
                    console.log('user created', user);
                    response.status(201).json(user);     
                }
            });
        }
    });
};
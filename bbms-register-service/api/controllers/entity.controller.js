var mongoose = require('mongoose');
var Entity = mongoose.model('Entity');
var EntityCredential = mongoose.model('EntityCredential');
var bcrypt = require('bcrypt-nodejs');

module.exports.register = function(req, res){
    console.log('Registering entity');
    console.log(req.body);
    var entityname = req.body.entityname;
    var username = req.body.username;
    var street = req.body.street;
    var city = req.body.city;
    var email = req.body.email;
    var state = req.body.state;
    var country = req.body.country;
    var zip = req.body.zip;
    var password = req.body.password;

    Entity.create({
       entityname: entityname,
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
            res.status(400).json(err);
        } else{
            EntityCredential.create({
                username: username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            }, function(error, userCred){
                if(error){
                    console.log(error);
                    res.status(400).json(error);
                } else{
                    console.log('user credentials saved', user);
                    res.status(201).json(user);
                }
            });
        }
    });
};
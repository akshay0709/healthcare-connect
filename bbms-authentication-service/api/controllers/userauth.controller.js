var mongoose = require('mongoose');
var UserCredential = mongoose.model('UserCredential');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports.login = function(request, response){
    console.log('Validating user');
    console.log(request.body);

    var username = request.body.username;
    var password = request.body.password;

    UserCredential
        .findOne({'username': username})
        .exec(function(error,user){
            if(error){
                console.log(error);
                response.status(400).json(error);
            } else if(user){
                if(bcrypt.compareSync(password, user.password)){
                    console.log('User found', user);
                    jwt.sign({username: user.username, role: user.role}, secretKey, function(error, token){
                        response
                            .status(200)
                            .json({'token': token});
                    });
                } else{
                    response.status(401).json('Unauthorized');
                }
            } else{
                response.status(401).json('Unauthorized');
            }
    });
};
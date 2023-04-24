var mongoose = require('mongoose');
var SuperUserCredentials = mongoose.model('SuperUser');
var EntityCredential = mongoose.model('EntityCredential');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports.login = function(request, response){
    console.log('Validating superuser');
    console.log(request.body);

    var username = request.body.username;
    var password = request.body.password;

    SuperUserCredentials
        .findOne({'username': username})
        .exec(function(error,user){
            if(error){
                console.log(error);
                response.status(400).json(error);
            } else if(user){
                if(password === user.password){
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

module.exports.activate = function(request, response){
    console.log('Enter activate function');
    console.log(request.params.id);
    EntityCredential
        .findOne({'_id': request.params.id})
        .exec(function(error, result){
            if(error){
                response
                    .status(500)
                    .json(error)
            } else{
                result.activation = true;
                result.save(function(error,update){
                    if(error){
                        response
                            .status(500)
                            .json(error)
                    } else {
                        response
                            .status(200)
                            .json(update)
                    }
                })
            } 
        })
}
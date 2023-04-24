var mongoose = require('mongoose');
var EntityCredential = mongoose.model('EntityCredential');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports.login = function(request, response){
    console.log('Validating entity');
    console.log(request.body);

    var username = request.body.username;
    var password = request.body.password;

    EntityCredential.findOne({
        'username': username
    }).exec(function(error,entity){
        if(error){
            console.log(error);
            response.status(400).json(error);
        } else if(entity){
            if(bcrypt.compareSync(password, entity.password)){
                console.log('entity found', entity);
                if(entity.activation){
                    jwt.sign({username: entity.username, role: entity.role}, secretKey, function(error, token){
                        response
                            .status(200)
                            .json({'token': token});
                    });
                } else {
                    response
                        .status(403)
                        .json('Forbidden');
                }
            } else{
                response.status(401).json('Unauthorized');
            }
        } else{
            response.status(401).json('Unauthorized');
        }
    });
};

module.exports.pendingactivations = function(request, response){
    console.log('Entered pending activation function');

    EntityCredential
        .find({'activation': false}, '_id role activation username')
        .exec(function(error, result){
            if(error){
                response
                    .status(500)
                    .json(error)
            } else if(result.length == 0){
                response
                    .status(404)
                    .json({'message': 'Not found'})
            } else{
                response
                    .status(200)
                    .json(result);
            }
        });
}
var mongoose = require('mongoose');
var Request = mongoose.model('Request');

module.exports.getAllRequests = function(request, response){
    console.log('Entered get requests respond function');
    console.log(request.params.username);

    Request
        .find({'usernameFor': request.params.username})
        .sort({'isComplete' : 1, 'requestedOn': -1})
        .exec(function(error, result){
            var customResponse = {
                status: 200,
                message: result
            };
            if(error){
                console.log('Error finding requests.');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!result){
                customResponse.status = 400;
                customResponse.message = {'message': 'Requests not found'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message);
        });
};

module.exports.getOneRequest = function(request, response){
    console.log(request.params.username);
    console.log(request.params.requestId);

    Request
        .findOne({'usernameFor': request.params.username, '_id': request.params.requestId})
        .exec(function(error, result){
            var customResponse = {
                status: 200,
                message: result
            };
            if(error){
                console.log(error);
                console.log('Error finding request')
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!result){
                customResponse.status = 400;
                customResponse.message = {'message': 'Request not found'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message);
        });
};

module.exports.updateOneRequest = function(request, response){
    console.log('Entered update request function');
    console.log(request.params.username);
    console.log(request.params.requestId);

    Request
        .findOne({'usernameFor': request.params.username, '_id': request.params.requestId})
        .exec(function(error, result){
            var customResponse = {
                status: 200,
                message: result
            };
            if(error){
                console.log(error);
                console.log('Error finding request')
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!result){
                customResponse.status = 400;
                customResponse.message = {'message': 'Request not found'};
            }
            if(customResponse.status != 200){
                response
                    .status(customResponse.status)
                    .json(customResponse.message);
            } else{
                console.log(result.note);
                result.isComplete = request.body.isComplete;
                result.save(function(error, updatedResult){
                    if(error){
                        response
                            .status(500)
                            .json(error);
                    } else {
                        console.log(updatedResult);
                        response
                            .status(200)
                            .json(updatedResult);
                    }
                });
            }
        });
};

module.exports.deleteOneRequest = function(request, response){
    console.log('Entering delete request function');
    
    Request
        .findOneAndRemove({'usernameFor': request.params.username, '_id': request.params.requestId})
        .exec(function(error, result){
            console.log(result);
            if(error){
                response
                    .status(500)
                    .json(error);
            } else if(!result){
                response
                    .status(404)
                    .json({'message': 'Appointment not found'});
            }else{
                console.log('Appointment deleted', request.params.requestId);
                response
                    .status(204)
                    .json();  
            }
        });
};
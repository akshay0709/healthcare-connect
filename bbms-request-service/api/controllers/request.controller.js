var mongoose = require('mongoose');
var Request = mongoose.model('Request');

module.exports.createRequest = function(request, response){
    console.log('Creating request');
    console.log(request.body);
    var usernameBy = request.body.usernameBy;
    var nameBy = request.body.nameBy;
    var usernameFor = request.body.usernameFor;
    var nameFor = request.body.nameFor;
    var severity = request.body.severity;
    var note = request.body.note;
    var address = request.body.address;

    Request.create({
        usernameBy : usernameBy,
        nameBy : nameBy,
        usernameFor : usernameFor,
        nameFor : nameFor,
        severity : severity,
        note : note,
        address : address
    }, function(error, result){
        if(error){
            console.log(error);
            response
                .status(400)
                .json(error);
        } else {
            console.log('Request created', result);
            response
                .status(200)
                .json(result);
        }
    });
};

module.exports.getAllRequests = function(request, response){
    console.log('Entered get requests function');
    console.log(request.params.username);

    Request
        .find({'usernameBy': request.params.username})
        .sort({'requestedOn' : -1})
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
        .findOne({'usernameBy': request.params.username, '_id': request.params.requestId})
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
        .findOne({'usernameBy': request.params.username, '_id': request.params.requestId})
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
                result.severity = request.body.severity || result.severity;
                result.note = request.body.note || result.note;
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
        .findOneAndRemove({'usernameBy': request.params.username, '_id': request.params.requestId})
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
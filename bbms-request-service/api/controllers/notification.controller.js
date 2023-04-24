var mongoose = require('mongoose');
var Request = mongoose.model('Request');

module.exports.getNotifications = function(request, response){
    console.log('Entered get notifications request');
    console.log(request.params.username);

    Request
        .find({'usernameFor' : request.params.username, 'isComplete' : 'false'})
        .exec(function(error, notifications){
            var customResponse = {
                status : 200,
                message : notifications.length
            };
            if(error){
                console.log('Error finding notifications');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error
            } else if(notifications.length == 0){
                console.log('No notifications');
                customResponse.status = 404;
                customResponse.message = {'message': 'No notifications'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message)
        });
};
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getUser = function(request, response){
    console.log('Entered getUser function');
    console.log(request.params.username);

    User
        .findOne({'username': request.params.username})
        .exec(function(error, user){
            var customResponse = {
                status: 200,
                message: user
            };
            if(error){
                console.log('Error finding user');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!user){
                customResponse.status = 404;
                customResponse.message = {'message': 'User not found.'};
            }
            response
                    .status(customResponse.status)
                    .json(customResponse.message);
        });

};

module.exports.updateUser = function(request, response){
    console.log('Entered updateUser function');
    console.log(request.params.username);

    User
        .findOne({'username': request.params.username})
        .exec(function(error, user){
            var customResponse = {
                status: 200,
                message: user
            };
            if(error){
                console.log('Error finding user');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!user){
                customResponse.status = 404;
                customResponse.message = {'message' : 'User not found.'};
            }
            if(customResponse.status != 200){
                response
                    .status(customResponse.status)
                    .json(customResponse.message);
            } else {
                user.firstname = request.body.firstname || user.firstname;
                user.lastname = request.body.lastname || user.lastname;
                user.street =  request.body.street || user.street;
                user.email = request.body.email || user.email;
                user.city = request.body.city || user.city;
                user.state = request.body.state || user.state;
                user.country = request.body.country || user.country;
                user.zip = request.body.zip || user.zip;
                user.save(function(error, updatedUser){
                    if(error){
                        response
                            .status(500)
                            .json(error);
                    } else {
                        console.log(updatedUser);
                        response
                            .status(200)
                            .json(updatedUser);
                    }
                });
            }
        });
};

module.exports.deleteUser = function(request, response){
    User
        .deleteOne({'username': request.params.username})
        .exec(function(error, user){
            if(error){
                response
                    .status(404)
                    .json(error);
            } else{
                console.log('User deleted: ', request.params.username);
                response
                    .status(204)
                    .json();
            }
        });

}
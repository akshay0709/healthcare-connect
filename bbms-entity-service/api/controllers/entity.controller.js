var mongoose = require('mongoose');
var Entity = mongoose.model('Entity');

module.exports.getEntity = function(request, response){
    console.log('Entered getEntity function');
    console.log(request.params.username);
    
    Entity
        .findOne({'username': request.params.username})
        .exec(function(error, entity){
            var customResponse = {
                status: 200,
                message: entity
            };
            if(error){
                console.log('Error finding user');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!entity){
                customResponse.status = 404;
                customResponse.message = {'message': 'Entity not found'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message);
        });
};

module.exports.updateEntity = function(request, response){
    console.log('Entered updateEntity function');
    console.log(request.params.username);

    Entity
        .findOne({'username': request.params.username})
        .exec(function(error, entity){
            var customResponse = {
                status: 200,
                message: entity
            };
            if(error){
                console.log('Error finding entity');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!entity){
                customResponse.status = 404;
                customResponse.message = {'message': 'Entity not found'};
            }
            if(customResponse.status != 200){
                response
                    .status(customResponse.status)
                    .json(customResponse.message);
            } else{
                entity.entityname = request.body.entityname || entity.entityname;
                entity.street = request.body.street || entity.street;
                entity.city = request.body.city || entity.city;
                entity.email = request.body.email || entity.email;
                entity.state = request.body.state || entity.state;
                entity.country = request.body.country || entity.country;
                entity.zip = request.body.zip || entity.zip;
                entity.save(function(error, updatedEntity){
                    if(error){
                        response
                            .status(500)
                            .json(error);
                    } else{
                        console.log(updatedEntity);
                        response
                            .status(200)
                            .json(updatedEntity);
                    }
                });
            }
        });
};

module.exports.deleteEntity = function(request, response){
    Entity
        .deleteOne({'username': request.params.username})
        .exec(function(error, entity){
            if(error){
                response
                    .status(404)
                    .json(error);
            } else{
                console.log('Entity deleted: ', request.params.username);
                response
                    .status(204)
                    .json();
            }
        })
}
var mongoose = require('mongoose');
var Entity = mongoose.model('Entity');

module.exports.getEntities = function(request, response){
    console.log('Entered getEntities function');
    console.log(request.query.city);
    console.log(request.query.zip);

    //var city = request.query.city.charAt(0).toUpperCase() + request.query.city.slice(1);
    var city = request.query.city;
    if(typeof city != "undefined"){
        city = request.query.city.charAt(0).toUpperCase() + request.query.city.slice(1);
    }
    var zip = request.query.zip;
    var query;
    
    if(city && zip){
        query = Entity.find({'city': city, 'zip': zip});
    } else if(typeof zip == 'undefined' && city){
        console.log("zip undefined");
        query = Entity.find({'city': city});
    } else if(typeof city == 'undefined' && zip){
        console.log("city undefined");
        query = Entity.find({'zip': zip});
    } else if(typeof city == 'undefined' && typeof zip == 'undefined'){
        console.log("both undefined");
        response
            .status(422)
            .json({'message': 'Parameters missing'})
    }

    if(query){
        query
        .exec(function(error, entities){
            var customResponse = {
                status: 200,
                message: entities
            };
            if(error){
                console.log('Error finding records');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!entities){
                customResponse.status = 404;
                customResponse.message = {'message': 'No records present'}
            }
            response
                .status(customResponse.status)
                .json(customResponse.message);
        });   
    }
}
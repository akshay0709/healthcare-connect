var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.createEvent = function(request, response){
    console.log('Creating Event');
    console.log(request.body);
    var username = request.body.username;
    var entityname = request.body.entityname;
    var heading = request.body.heading;
    var content = request.body.content;
    var location = request.body.location;
    var date = request.body.date;

    Event.create({
        username: username,
        entityname: entityname,
        heading: heading,
        content: content,
        location: location,
        date: date
    }, function(error, event){
        if(error){
            console.log(error);
            response
                .status(400)
                .json(error);
        } else{
            console.log('Event created', event);
            response
                .status(200)
                .json(event);
        }
    });
};

module.exports.getEventsByLocation = function(request, response){
    console.log('Entered getEventsOnLocation function');
    console.log(request.query.location);

    Event
        .find({'location': request.query.location, 'hasExpired': false})
        .exec(function(error, events){
            var customRespone = {
                status: 200,
                message: events
            };
            if(error){
                console.log('Error finding events');
                console.log(error);
                customRespone.status = 500;
                customRespone.message = error;
            } else if(!events){
                customRespone.status = 400;
                customRespone.message = {'message': 'Appointment not found.'};
            }
            response
                .status(customRespone.status)
                .json(customRespone.message);
        });
};

module.exports.getEventsByEntity = function(request, response){
    console.log('Entered getEventsByEntity function');
    console.log(request.params.username);

    Event
        .find({'username': request.params.username})
        .exec(function(error, events){
            var customRespone = {
                status: 200,
                message: events
            };
            if(error){
                console.log('Error finding events');
                console.log(error);
                customRespone.status = 500;
                customRespone.message = error;
            } else if(!events){
                customRespone.status = 400;
                customRespone.message = {'message': 'Appointment not found.'};
            }
            response
                .status(customRespone.status)
                .json(customRespone.message);
        });
};

module.exports.getOneEventByEntityAndId = function(request, response){
    console.log('Entered getEventsByEntity function');
    console.log(request.params.username);
    console.log(request.params.eventId);

    Event
        .findOne({'username': request.params.username, '_id': request.params.eventId})
        .exec(function(error, event){
            var customRespone = {
                status: 200,
                message: event
            };
            if(error){
                console.log('Error finding events');
                console.log(error);
                customRespone.status = 500;
                customRespone.message = error;
            } else if(!event){
                customRespone.status = 400;
                customRespone.message = {'message': 'Appointment not found.'};
            }
            response
                .status(customRespone.status)
                .json(customRespone.message);
        });
}

module.exports.updateEventByEntity  = function(request, response){
    console.log('Entered updateEventByEntity function');
    console.log(request.params.username);
    console.log(request.params.eventId);

    Event
        .findOne({'username': request.params.username, '_id': request.params.eventId})
        .exec(function(error, event){
            var customResponse = {
                status: 200,
                message: event
            };
            if(error){
                console.log('Error finding event');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!event){
                customResponse.status = 404;
                customResponse.message = {'message': 'Event not found'};
            }
            if(customResponse.status != 200){
                console.log(customResponse);
                response
                    .status(customResponse.status)
                    .json(customResponse.message);
            } else{
                event.heading = request.body.heading || event.heading;
                event.content = request.body.content || event.content;
                event.location = request.body.location || event.location;
                event.date = request.body.date || event.date;
                event.hasExpired = request.body.hasExpired || event.hasExpired;
                event.save(function(error, updatedEvent){
                    if(error){
                        response
                            .status(500)
                            .json(error);
                    } else{
                        console.log(updatedEvent);
                        response
                            .status(200)
                            .json(updatedEvent);
                    }
                });
            }
        });
};

module.exports.deleteEventByEntity = function(request, response){
    console.log('Entering deleteEvent function');

    Event
        .deleteOne({'username': request.params.username, '_id': request.params.eventId})
        .exec(function(error, event){
            if(error){
                response
                    .status(500)
                    .json(error);
            } else if(!event){
                response
                    .status(404)
                    .json({'message': 'Event not found'})
            } else {
                console.log('Event deleted', request.params.eventId);
                response
                    .status(204)
                    .json();
            }
        });
};
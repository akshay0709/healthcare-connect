var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports.getAllAppointment = function(request, response){
    console.log('Entered get appointment');
    console.log(request.params.username);

    Appointment
        .find({'entityUsername': request.params.username})
        .exec(function(error, appointment){
            var customResponse = {
                status: 200,
                message: appointment
            };
            if(error){
                console.log('Error finding appointments');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!appointment){
                customResponse.status = 400;
                customResponse.message = {'message': 'Appointment not found.'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message);
        });
};

module.exports.getOneAppointment = function(request, response){
    Appointment
        .findOne({'entityUsername': request.params.username, '_id': request.params.appointmentId})
        .exec(function(error, appointment){
            var customResponse = {
                status: 200,
                message: appointment 
            };
            if(error){
                console.log(appointment);
                console.log('Error finding appointments');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!appointment){
                customResponse.status = 400;
                customResponse.message = {'message': 'Appointment not found.'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message);
        });
}

module.exports.updateAppointment = function(request, response){
    console.log('Entered updateAppointment function');
    console.log(request.params.username);
    console.log(request.params.appointmentId);

    Appointment
        .findOne({'entityUsername': request.params.username, '_id': request.params.appointmentId})
        .exec(function(error, appointment){
            var customResponse = {
                status: 200,
                message: appointment
            };
            if(error){
                console.log('Error finding appointment');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!appointment){
                customResponse.status = 400;
                customResponse.message = {'message': 'Appointment not found.'}
            }
            if(customResponse.status != 200){
                console.log(customResponse);
                response
                    .status(customResponse.status)
                    .json(customResponse.message);
            } else{
                appointment.isCompleted = request.body.isCompleted;
                appointment.save(function(error, updatedAppointment){
                    console.log("Here");
                    if(error){
                        response
                            .status(500)
                            .json(error);
                    } else{
                        console.log(updatedAppointment);
                        response
                            .status(200)
                            .json(updatedAppointment);
                    }
                });
            }
        });
};

module.exports.deleteAppointment = function(request, response){
    console.log('Entering deleteAppointment function');
    
    Appointment
        .findOneAndRemove({'entityUsername': request.params.username, '_id': request.params.appointmentId})
        .exec(function(error, appointment){
            console.log(appointment);
            if(error){
                response
                    .status(500)
                    .json(error);
            } else if(!appointment){
                response
                    .status(404)
                    .json({'message': 'Appointment not found'});
            }else{
                console.log('Appointment deleted', request.params.appointmentId);
                response
                    .status(204)
                    .json();  
            }
        });
};
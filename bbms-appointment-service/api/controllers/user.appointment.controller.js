var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

//USER
module.exports.createAppointment = function(request, response){
    console.log('Creating appointment');
    console.log(request.body);
    var entityUsername  = request.body.entityUsername;
    var entityName = request.body.entityName;
    var userUsername = request.body.userUsername;
    var userFirstname = request.body.userFirstname;
    var userLastname = request.body.userLastname;
    var userContact = request.body.userContact;
    var userEmail = request.body.userEmail;
    var appointmentDate = request.body.appointmentDate;

    Appointment.create({
        entityUsername: entityUsername,
        entityName: entityName,
        userUsername: userUsername,
        userFirstname: userFirstname,
        userLastname: userLastname,
        userContact: userContact,
        userEmail: userEmail,
        appointmentDate: appointmentDate
    }, function(error, appointment){
        if(error){
            console.log(error);
            response
                .status(400)
                .json(error);
        } else{ 
            console.log('Appointment created', appointment);
            response
                .status(200)
                .json(appointment);
        }
    });
};

module.exports.getAllAppointment = function(request, response){
    console.log('Entered get appointment');
    console.log(request.params.username);

    Appointment
        .find({'userUsername': request.params.username})
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
        .findOne({'userUsername': request.params.username, '_id': request.params.appointmentId})
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
        .findOne({'userUsername': request.params.username, '_id': request.params.appointmentId})
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
                appointment.appointmentDate = request.body.appointmentDate || appointment.appointmentDate;
                appointment.userContact = request.body.userContact || appointment.userContact;
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
        .findOneAndRemove({'userUsername': request.params.username, '_id': request.params.appointmentId})
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


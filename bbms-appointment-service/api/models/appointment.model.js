var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    entityUsername:{
        type: String,
        required: true
    },
    entityName:{
        type: String,
        required: true
    },
    userUsername:{
        type: String,
        required: true
    },
    userFirstname:{
        type: String,
        required: true
    },
    userLastname:{
        type: String,
        required: true
    },
    userContact:{
        type: Number,
    },
    userEmail:{
        type: String,
        required: true
    },
    appointmentDate:{
        type: Date,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    isCompleted:{
        type: Boolean,
        default: false
    }  
}, {collection: 'appointments'});

mongoose.model('Appointment', appointmentSchema);
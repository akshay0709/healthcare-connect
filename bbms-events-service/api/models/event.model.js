var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    entityname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    heading:{
        type: String,
        required: true    
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    hasExpired:{
        type: Boolean,
        default: false
    }
}, {collection: 'events'});

mongoose.model('Event', eventSchema);
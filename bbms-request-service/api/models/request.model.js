var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    usernameBy:{
        type: String,
        required: true
    },
    nameBy:{
        type: String,
        required: true
    },
    usernameFor:{
        type: String,
        required: true
    },
    nameFor:{
        type: String,
        required: true
    },
    severity:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    requestedOn:{
        type: Date,
        default: Date.now
    },
    isComplete:{
        type: Boolean,
        default: false
    },
    updatedOn:{
        type: Date,
        default: null
    }
}, {collection: 'requests'});

mongoose.model('Request', requestSchema);
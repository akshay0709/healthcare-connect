var mongoose = require('mongoose');

var entitySchema = new mongoose.Schema({
    entityname:{
        type: String
    },
    username:{
        type: String,
    },
    street:{
        type: String,
    },
    city:{
        type: String,
    },
    email:{
        type: String,
    },
    state:{
        type: String,
    },
    country:{
        type: String,
    },
    zip:{
        type: Number,
    }
}, {collection: 'entities'});

mongoose.model('Entity', entitySchema);
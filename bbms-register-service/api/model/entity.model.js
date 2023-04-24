var mongoose = require('mongoose');

var entitySchema = new mongoose.Schema({
    entityname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required:true
    },
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    zip:{
        type: Number,
        required: true
    }
}, {collection : 'entities'});

var entityCredentialsSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'entity'
    },
    activation:{
        type: Boolean,
        default: false
    }
}, {collection : 'entitycredentials'});

mongoose.model('EntityCredential', entityCredentialsSchema);
mongoose.model('Entity', entitySchema);
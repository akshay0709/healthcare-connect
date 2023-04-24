var mongoose = require('mongoose');

var entitySchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String
    },
    activation:{
        type: Boolean
    }
}, {collection : 'entitycredentials'});

mongoose.model('EntityCredential', entitySchema);
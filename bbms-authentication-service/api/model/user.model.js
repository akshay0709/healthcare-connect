var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
        type:  String
    }
}, {collection : 'usercredentials'});

mongoose.model('UserCredential', userSchema);
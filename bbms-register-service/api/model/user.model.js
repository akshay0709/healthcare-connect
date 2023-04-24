var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
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
    email:{
        type: String,
        required: true
    },
    city:{
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
}, {collection : 'users'});

var userCredentialsSchema = new mongoose.Schema({
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
        default: 'user'
    }
}, {collection : 'usercredentials'});

mongoose.model('UserCredential', userCredentialsSchema);
mongoose.model('User', userSchema);
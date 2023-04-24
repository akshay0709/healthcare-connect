var mongoose = require('mongoose');

var superUserSchema = new mongoose.Schema({
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
}, {collection : 'superadmin'});

mongoose.model('SuperUser', superUserSchema);
var mongoose = require('mongoose');

var bloodTypeSchema = new mongoose.Schema({
    bloodGroup:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    }
});

var inventorySchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    entityName:{
        type: String,
        required: true
    },
    bloodType: [bloodTypeSchema]
}, {collection : 'inventory'});

mongoose.model('Inventory', inventorySchema);
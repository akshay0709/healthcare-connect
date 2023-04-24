var mongoose = require('mongoose');
var Inventory = mongoose.model('Inventory');

var aPositive = 'A Positive';
var aNegative = 'A Negative';
var bPositive = 'B Positive';
var bNegative = 'B Negative';
var abPositive = 'AB Positive';
var abNegative = 'AB Negative';
var oPositive = 'O Positive';
var oNegative = 'O Negative';

module.exports.createInventory = function(request, response){
    console.log('Creating inventory for user');
    console.log(request.log);
    var username = request.body.username;
    var entityName = request.body.entityName;

    Inventory.create({
        username: username,
        entityName: entityName,
        bloodType : [
            {'bloodGroup': aPositive },
            {'bloodGroup': aNegative },
            {'bloodGroup': bPositive },
            {'bloodGroup': bNegative },
            {'bloodGroup': abPositive },
            {'bloodGroup': abNegative },
            {'bloodGroup': oPositive },
            {'bloodGroup': oNegative }
        ]
    }, function(error, inventory){
        if(error){
            console.log(error);
            response
                .status(400)
                .json(inventory);
        } else{
            console.log('Inventory created for' + entityName);
            response
                .status(200)
                .json(inventory);
        }
    });
};

module.exports.getInventoryByUsername = function(request, response){
    console.log('Entered getInventory function');
    console.log(request.params.username);

    Inventory
        .findOne({'username': request.params.username})
        .exec(function(error, inventory){
            console.log(inventory);
            var customResponse = {
                status: 200,
                message: inventory
            };
            if(error){
                console.log('Error finding inventory');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!inventory){
                customResponse.status = 404;
                customResponse.message = {'message': 'Inventory not found'};
            }
            response
                .status(customResponse.status)
                .json(customResponse.message.bloodType);
        });
};

module.exports.updateInventory = function(request, response){
    console.log('Entered updateInventory function');
    console.log(request.params.username);
    console.log(request.body);
    
    Inventory
        .findOne({'username': request.params.username})
        .exec(function(error, inventory){
            var customResponse = {
                status: 200,
                message: inventory
            };
            if(error){
                console.log('Error finding entity');
                console.log(error);
                customResponse.status = 500;
                customResponse.message = error;
            } else if(!inventory){
                customResponse.status = 404;
                customResponse.message = {'message': 'Record not found'}
            }
            if(customResponse.status != 200){
                response
                    .status(customResponse.status)
                    .json(customResponse.message);
            } else {
                inventory.bloodType = [
                    {'bloodGroup': aPositive, 'quantity':  parseInt(request.body.aPositive)},
                    {'bloodGroup': aNegative, 'quantity':  parseInt(request.body.aNegative)},
                    {'bloodGroup': bPositive, 'quantity':  parseInt(request.body.bPositive)},
                    {'bloodGroup': bNegative, 'quantity':  parseInt(request.body.bNegative)},
                    {'bloodGroup': abPositive, 'quantity': parseInt(request.body.abPositive)},
                    {'bloodGroup': abNegative, 'quantity': parseInt(request.body.abNegative)},
                    {'bloodGroup': oPositive, 'quantity':  parseInt(request.body.oPositive)},
                    {'bloodGroup': oNegative, 'quantity':  parseInt(request.body.oNegative)}
                ]
                
                inventory.save(function(error, updatedInventory){
                    console.log(updatedInventory);
                    if(error){
                        response
                            .status(500)
                            .json(error);
                    } else {
                        response
                            .status(204)
                            .json(updatedInventory);
                    }
                });
            }
        });
}

module.exports.deleteInventoryByUsername = function(request, response){
    console.log('Entering deleteInventory functions');

    Inventory
        .findOneAndRemove({'username': request.params.username})
        .exec(function(error, inventory){
            console.log(inventory);
            if(error){
                response
                    .status(500)
                    .json(error);
            } else if(!inventory){
                response
                    .status(404)
                    .json({'message': 'Inventory not found'})
            } else {
                console.log('Inventory deleted', request.params.username)
                response
                    .status(204)
                    .json();
            }
        });
}
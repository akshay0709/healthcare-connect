angular.module('bbms').controller('RegisterController', RegisterController);

function RegisterController($http, baseurl){
    var vm = this;

    // Register user function
    vm.registeruser = function(){
        var user = {
            firstname: vm.firstname,
            lastname: vm.lastname,
            username: vm.username,
            password: vm.password,
            street: vm.street,
            city: vm.city,
            email: vm.email,
            state: vm.state,
            country: vm.country,
            zip: vm.zip
        };

        $http.post(baseurl + '/api/register/user', user).then(function(result){
            vm.message = 'You are now sucessfully registered. Please login!';
            vm.error='';
        }).catch(function(error){
            if(error.data.code == 11000){
                vm.error = 'User already present.';
            } else{
                vm.error = 'There was some error processing your request. Please try again!';
            }
        });
    }


    //Register entity function
    vm.registerentity = function(){
        var entity = {
            entityname: vm.entityname,
            username: vm.username,
            password: vm.password,
            street: vm.street,
            city: vm.city,
            email: vm.email,
            state: vm.state,
            country: vm.country,
            zip: vm.zip
        };

        $http.post(baseurl + '/api/register/entity', entity).then(function(result){
            vm.error= null;
            vm.message = 'You are now sucessfully registered. You will be able to login once you provide your registration. Please email your registration copy to activation@fhc.com';
        }).catch(function(error){
            if(error.data.code == 11000){
                vm.error = 'You are already registered with us.'
            } else{
                vm.error = 'There was some error processing your request. Please try again!';
            }
        });
    }
};
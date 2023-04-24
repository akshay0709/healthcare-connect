angular.module('bbms').controller('SearchController', SearchController);

function SearchController($route, $http, $window, AuthFactory, $scope, $location, $timeout, baseurl){
    var vm = this;

    //On load function
    var init = function(){
        var city = $location.search().city;
        var zip = $location.search().zip;
        var url = "";
        if(typeof city == 'undefined'){
            url = baseurl + '/api/search/entities?zip=' + zip;
        } else if(typeof zip == 'undefined'){
            url = baseurl + '/api/search/entities?city=' + city;
        } else{
            url = baseurl + '/api/search/entities?city=' + city + '&zip=' + zip;
        }
        
        $http.get(url).then(function(response){
            if(response.status === 200){
                if(response.data.length == 0){
                    vm.noresult = 'It seems there are no organizations in the area you searched for.';
                } else{
                    vm.entitylist = response.data;
                }
            }
        }).catch(function(error){
            vm.error = 'There was some error processing your request. Please try again.';
        });
    }

    vm.confirm = function(name){

        var appointment = {
            entityUsername : name.$$element[0].elements.entityusername.value,
            entityName : name.$$element[0].elements.entityname.value,
            userUsername : $window.sessionStorage.username,
            userFirstname : $window.sessionStorage.firstname,
            userLastname : $window.sessionStorage.lastname,
            userContact : name.$$controls[1].$viewValue,
            userEmail : $window.sessionStorage.email,
            appointmentDate : name.$$controls[0].$viewValue,
            //time : name.$$controls[1].$viewValue
        }

        $http.post(baseurl + '/api/appointment-management/appointments/users', appointment).then(function(response){
            if(response.status === 200){
                vm.aptSuccess = "Appointment created";
                $timeout(function(){
                    $window.location.reload();
                }, 1000)
            }
        }).catch(function(error){
            vm.aptError = "Error occured ! Unable to create appointment";
        })
    };
    
    init();
};
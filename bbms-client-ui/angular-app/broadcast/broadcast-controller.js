angular.module('bbms').controller('BroadcastController', BroadcastController);

function BroadcastController($http, $window, $timeout, baseurl){
    var username = $window.sessionStorage.username
    var vm = this;

    vm.broadcast = function(){
        var city = vm.location;
        var email = {
            subject : vm.subject,
            message : vm.message,
            username : username
        }

        $http.post(baseurl + '/api/broadcast-service/send?city=' + city, email).then(function(response){
            if(response.status === 202){
                vm.error = null;
                vm.success = 'Emails sent.'
                $timeout(function(){
                    $window.location.reload();
                }, 1000)
            }
        }).catch(function(error){
            vm.error = 'Failed.'
        });
    }

    vm.viewpastbroadcast = function(){
        $http.get(baseurl + '/api/broadcast-service/pastbroadcasts/' + username).then(function(response){
            if(response.status === 200){
                vm.nopastbroadcasts = null;
                vm.pastbroadcastserror = null;
                vm.pastbroadcasts = response.data;
            }
        }).catch(function(error){
            if(error.status === 404){
                vm.pastbroadcastserror = null;
                vm.nopastbroadcasts = 'You do not have any past broadcasts.';
            } else{
                vm.nopastbroadcasts = null;
                vm.pastbroadcasts = null;
                vm.pastbroadcastserror = 'Error';
            }
        });
    }
}
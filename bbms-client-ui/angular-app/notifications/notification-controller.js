angular.module('bbms').controller('NotificationController', NotificationController);

function NotificationController($http, $window, $timeout, baseurl){
    var vm =this;
    var username = $window.sessionStorage.username;

    var init = function(){
        $http.get(baseurl + '/api/request-management/respond/' + username).then(function(response){
            if(response.status === 200){
                if(response.data.length == 0){
                    vm.error = null;
                    vm.norequests = 'You do not have any requests.';
                } else{
                    vm.error = null;
                    vm.requests = response.data;
                }
            }
        }).catch(function(error){
            vm.error = 'Error fetching requests.'
        });
    }

    vm.respond = function(name){
        var id = name.$$element[0].elements.id.value;

        var respond = {
            isComplete : vm.status
        }

        $http.put(baseurl + '/api/request-management/respond/' + username + '/' + id, respond).then(function(response){
            if(response.status === 200){
                vm.responderror = null;
                vm.respondnoted = 'Your response was noted.'
                $timeout(function(){
                    $window.location.reload();
                },1000);
            }
        }).catch(function(error){
            vm.responderror = 'Error. Please try again.'
        });
    }

    init();
}
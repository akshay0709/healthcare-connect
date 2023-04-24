angular.module('bbms').controller('RequestController', RequestController);

function RequestController($http, $window, $timeout, $location, $scope, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;
    var entityname = $window.sessionStorage.entityname;
    var init = function(){
        $http.get(baseurl + '/api/request-management/requests/' + username).then(function(response){
            if(response.status === 200){
                if(response.data.length == 0){
                    vm.requesterror = null;
                    vm.norequests = 'You do not have any outgoing requests.';
                } else{
                    vm.requesterror = null;
                    vm.requests = response.data;
                }
            }
        }).catch(function(error){
            vm.requesterror = 'Error fetching requests.'
        });
    }

    vm.search = function(){
        var city = vm.searchcity;
        var zip = vm.searchzip;
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
                    vm.entitylist = null;
                } else{
                    vm.noresult = null;
                    vm.error = null;
                    vm.entitylist = response.data;
                }
            }
        }).catch(function(error){
            vm.error = 'There was some error processing your request. Please try again.';
        });
    }

    vm.makerequest = function(name){
        var usernameFor = name.$$element[0].elements.usernameFor.value;
        var nameFor = name.$$element[0].elements.nameFor.value;
        var request = {
            usernameBy : username,
            nameBy : entityname,
            usernameFor : usernameFor,
            nameFor : nameFor,
            severity : vm.severity,
            note : vm.note,
            address : vm.address
        }

        $http.post(baseurl + '/api/request-management/requests', request).then(function(response){
            if(response.status === 200){
                vm.requesterror = null;
                vm.requestsuccess = 'Request sent.'
                $timeout(function(){
                    $('#requestModal' + usernameFor).modal('hide');
                },1000).then(function(){
                    $timeout(function(){
                        $location.path('/outgoingrequest');
                    }, 1000)
                });
            }
        }).catch(function(error){
            vm.requesterror = 'Error sending request.'
        });
    }

    vm.editrequest = function(name){
        var id = name.$$element[0].elements.id.value;
        var request = {
            severity : vm.editedseverity,
            note : vm.editednote,
            address : vm.address
        }

        $http.put(baseurl + '/api/request-management/requests/' + username + '/' + id, request).then(function(response){
            if(response.status === 200){
                vm.editreqerror = null;
                vm.editreqsuccess = 'Request edited.'
                $timeout(function(){
                    $window.location.reload();
                },1000);
            }
        }).catch(function(error){
            vm.editreqerror = 'Unable to edit request. Try again.'
        })
    }

    vm.deleterequest = function(name){
        var id = name.$$element[0].elements.id.value;
        
        $http.delete(baseurl + '/api/request-management/requests/' + username + '/' + id).then(function(response){
            if(response.status === 204){
                vm.deletereqerror = null;
                vm.deletereqsuccess = 'Request deleted.'
                $timeout(function(){
                    $window.location.reload();
                },1000)
            }
        }).catch(function(error){
            vm.deletereqerror = 'Unable to delete request. Try again.'
        });
    }

    init();
}
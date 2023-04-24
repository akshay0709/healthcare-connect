angular.module('bbms').controller('EditEventController', EditEventController);

function EditEventController($http, $window, $routeParams, $timeout, $location, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;
    var id = $routeParams.id;

    var init = function(username, id){
        $http.get(baseurl + '/api/event-management/events/' + username + '/' + id).then(function(response){
            if(response.status === 200){
                vm.heading = response.data.heading;
                vm.content = response.data.content;
                vm.location = response.data.location;
                vm.date = new Date(response.data.date);
                vm.status = response.data.status;
                vm.eventid = response.data._id;
            }
        }).catch(function(error){
            vm.error = 'Error'
        });
    }

    vm.updateevent = function(eventid){
        var event = {
            heading : vm.heading,
            content : vm.content,
            location : vm.location,
            date : vm.date,
            hasExpired : vm.status
        };
        
        $http.put(baseurl + '/api/event-management/events/' + username + '/' + eventid, event).then(function(response){
            if(response.status === 200){
                vm.updatefail = false;
                vm.updatesuccess = 'Event updated successfully.';
                $timeout(function(){
                    $location.path('/eventsmanagement');
                },1000);
            }
        }).catch(function(error){
            vm.updatefail = 'Failed to update event.'
        });
    }
    
    if(typeof id != 'undefined'){
        init(username, id);
    }
}


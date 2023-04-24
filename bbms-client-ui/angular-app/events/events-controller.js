angular.module('bbms').controller('EventsController', EventsController);

function EventsController($http, $window, $timeout, $location, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;
    var entityname = $window.sessionStorage.entityname;
    var init = function(){
        $http.get(baseurl + '/api/event-management/events/' + username).then(function(response){
            if(response.status === 200){
                if(response.data.length == 0){
                    vm.error = null;
                    vm.noevents = 'You do not have any events';
                } else{
                    vm.error = null;
                    vm.events = response.data;
                }
            }
        }).catch(function(error){
            vm.error = 'Error fetching events.'
        });
    }

    vm.deleteevent = function(name){
        var id = name.$$element[0].elements.id.value;
        $http.delete(baseurl + '/api/event-management/events/' + username + '/' + id).then(function(response){
        if(response.status === 204){
            vm.delEventSuccess = 'Event deleted';
            $timeout(function(){
                $('#deleteEventModal' + id).modal('hide');
                $window.location.reload();
            }, 1000);
        }
        }).catch(function(error){
            vm.delEventError = 'Could\'nt delete event';
        });
    }

    vm.addevent = function(){
        var event = {
            username : username,
            entityname : entityname,
            heading : vm.heading,
            content : vm.content,
            location : vm.location,
            date : vm.date
        }
        
        $http.post(baseurl + '/api/event-management/events', event).then(function(response){
            if(response.status === 200){
                vm.adderror = null;
                vm.addsuccess = 'Event created.';
                $timeout(function(){
                    $location.path('/eventsmanagement');
                }, 1000);
            }
        }).catch(function(error){
            vm.adderror = 'Error! Try again.'
        });
    }

    init();
}
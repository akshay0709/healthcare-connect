angular.module('bbms').controller('AppointmentController', AppointmentController);

function AppointmentController($http, $window, $route, $timeout, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;

    var init = function(){
        $http.get(baseurl + '/api/appointment-management/appointments/users/' + username).then(function(response){
            if(response.status === 200){
                if(response.data.length == 0){
                    vm.aptnoresults = 'You do not have any appointments.';
                } else{
                    vm.appointments = response.data;
                }
            }
        }).catch(function(error){
            vm.apterror = 'There was some error finding your appointments.';
        });
    };

    vm.editappointment = function(name){
        var id = name.$$element[0].elements.id.value;
        
        var editParams = {
            appointmentDate : name.$$controls[0].$viewValue,
            userContact : name.$$controls[1].$viewValue
        }

        $http.put(baseurl + '/api/appointment-management/appointments/users/' + username + '/' + id, editParams).then(function(response){
            if(response.status === 200){
                vm.aptSuccess = 'Appointment updated sucessfully';
                $timeout(function(){
                    $('#appointmentModal' + id).modal('hide');
                    $window.location.reload();
                }, 1000);
            }
        }).catch(function(error){
            vm.aptError = 'Error updating appointment';
        });
    }

    vm.deleteappointment = function(name){
        var id = name.$$element[0].elements.id.value;
        $http.delete(baseurl + '/api/appointment-management/appointments/users/' + username + '/' + id).then(function(response){
        if(response.status === 204){
            vm.delAptSuccess = "Appointment deleted";
            $timeout(function(){
                $('#deleteAptModal' + id).modal('hide');
                $window.location.reload();
            }, 1000);
        }
        }).catch(function(error){
            vm.delAptError = "Could'nt delete appointment";
        });
    }


    init();
}
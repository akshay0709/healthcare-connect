angular.module('bbms').controller('EntityAppointmentController', EntityAppointmentController);

function EntityAppointmentController($http, $window, $timeout, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;
    var init = function(){
        $http.get(baseurl + '/api/appointment-management/appointments/entities/' + username).then(function(response){
            if(response.status === 200){
                if(response.data.length == 0){
                    vm.aptnoresults = 'You do not have any appointments scheduled.';
                } else{
                    vm.appointments = response.data;
                }
            }
        }).catch(function(error){
            vm.apterror = 'There was some error finding your appointments.';
        });
    };

    vm.changeaptstatus = function(name){
        var id = name.$$element[0].elements.id.value;
        var status = vm.status;
        if(typeof status != 'undefined'){
            vm.aptError = null;
            var newstatus = {
                isCompleted: vm.status
            }
    
            $http.put(baseurl + '/api/appointment-management/appointments/entities/' + username + '/' + id, newstatus).then(function(response){
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
        } else{
            vm.aptError = 'Please select a valid value.'
        }
    }

    vm.deleteappointment = function(name){
        var id = name.$$element[0].elements.id.value;
        $http.delete(baseurl + '/api/appointment-management/appointments/entities/' + username + '/' + id).then(function(response){
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
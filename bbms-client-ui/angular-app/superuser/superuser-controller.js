angular.module('bbms').controller('SuperUserController', SuperUserController);

function SuperUserController($http, $location, $window, jwtHelper, AuthFactory, $rootScope, $timeout, baseurl){
    var vm = this;
    $rootScope.loggedUser = $window.sessionStorage.username;
    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        } else {
            return false;
        }
    };

    vm.loginsuperuser = function(){
        if(vm.username && vm.password){
            var user = {
                username: vm.username,
                password: vm.password
            };

            $http.post(baseurl + '/api/authenticate/superuser', user).then(function(response){
                if(response.data.token){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    $window.sessionStorage.username = decodedToken.username;
                    $window.sessionStorage.role = decodedToken.role;
                    vm.loggedInUser = $window.sessionStorage.username;
                    $rootScope.loggedUser = decodedToken.username;
                    $rootScope.role = decodedToken.role;
                    $location.path('/superuserdashboard');
                }
            }).catch(function(error){
                if(error.status == 401){
                    vm.error = 'Username or password incorrect!';
                }
            });
        }
    };

    vm.pendingactivations = function(){
        $http.get(baseurl + '/api/authenticate/superuser').then(function(response){
            if(response.status === 200){
                vm.nounactiv = null;
                vm.unerror = null;
                vm.activsuccess = null;
                vm.activerror = null
                vm.unactivatedaccounts = response.data;
            }
        }).catch(function(error){
            if(error.status === 404){
                vm.nounactiv = 'No unactive accounts';
            } else{
                vm.unerror = 'Error processing your request';
            }
        });
    };

    vm.activate = function(id){
        $http.put(baseurl + '/api/authenticate/superuser/' + id).then(function(response){
            if(response.status === 200){
                vm.activerror = null;
                vm.activsuccess = 'Activated';
                $timeout(function(){
                    $window.location.reload();
                }, 1000);
            }
        }).catch(function(error){
            vm.activerror = 'Error';
        });
    }
}
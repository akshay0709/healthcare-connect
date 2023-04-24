angular.module('bbms').controller('LoginController', LoginController);

function LoginController($http, $location, $window, jwtHelper, AuthFactory, $rootScope, baseurl){
    var vm = this;
    console.log(baseurl);
    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        } else {
            return false;
        }
    };

    vm.loginuser = function(){
        if(vm.username && vm.password){
            var user = {
                username: vm.username,
                password: vm.password
            };

            $http.post(baseurl + '/api/authenticate/user', user).then(function(response){
                if(response.data.token){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    $window.sessionStorage.username = decodedToken.username;
                    $window.sessionStorage.role = decodedToken.role;
                    $rootScope.loggedUser = $window.sessionStorage.username;
                    $rootScope.role = $window.sessionStorage.role;
                    //vm.loggedInUser = $window.sessionStorage.username;
                    $location.path('/homeuser');
                }
            }).catch(function(error){
                if(error.status == 401){
                    vm.error = 'Username or password incorrect!';
                }
            });
        }
    };


    vm.loginentity = function(){
        if(vm.username && vm.password){
            var user = {
                username: vm.username,
                password: vm.password
            };

            $http.post(baseurl + '/api/authenticate/entity', user).then(function(response){
                if(response.data.token){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    $window.sessionStorage.username = decodedToken.username;
                    $window.sessionStorage.role = decodedToken.role;
                    vm.loggedInUser = $window.sessionStorage.username;
                    $location.path('/dashboard');
                }
            }).catch(function(error){
                if(error.status == 401){
                    vm.error = 'Username or password incorrect!';
                }
            });
        }
    };

    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        $window.sessionStorage.clear();
        delete $rootScope.notificationCount;
        delete $rootScope.loggedUser;
        delete $rootScope.role;
        $location.path('/');
    }

    vm.init = function(){
        $rootScope.loggedUser = $window.sessionStorage.username;
        $rootScope.role = $window.sessionStorage.role;
    }
};
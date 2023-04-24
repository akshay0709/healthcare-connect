angular.module('bbms').controller('HomeController', HomeController);

function HomeController($route, $http, $window, AuthFactory, $scope, $location, $rootScope, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;
    var role = $window.sessionStorage.role;
    vm.isLoggedIn = function () {
        if(AuthFactory.isLoggedIn){
          return true;
        } else {
          return false;
        }
    };
    //GET Data on load
    var init = function(){
        $rootScope.loggedUser = $window.sessionStorage.username;
        $rootScope.role = $window.sessionStorage.role;
        $http.get(baseurl + '/api/users/' + username).then(function(response){
        if(response.status === 200){
            vm.firstname = response.data.firstname;
            vm.lastname = response.data.lastname;
            vm.username = response.data.username;
            vm.email = response.data.email;
            vm.street = response.data.street;
            vm.city = response.data.city;
            vm.state = response.data.state;
            vm.country = response.data.country;
            vm.zip = response.data.zip;
            $window.sessionStorage.firstname = response.data.firstname;
            $window.sessionStorage.lastname = response.data.lastname;
            $window.sessionStorage.email = response.data.email;
        }
        return $http.get(baseurl + '/api/event-management/events?location=' + response.data.city);
        })
        .then(function(responseNews){
            if(responseNews.status === 200){
                vm.events = responseNews.data;
            }
        })
        .catch(function(error){
        });
    }
    
    // Modify Profile
    vm.modifyprofile = function(){
        var user ={
            firstname: vm.firstname,
            lastname: vm.lastname,
            street: vm.street,
            city: vm.city,
            email: vm.email,
            state: vm.state,
            country: vm.country,
            zip: vm.zip
        };

        $http.put(baseurl + '/api/users/' + username, user).then(function(response){
            if(response.status ===200){
                vm.firstname = response.data.firstname;
                vm.lastname = response.data.lastname;
                vm.email = response.data.email;
                vm.street = response.data.street;
                vm.city = response.data.city;
                vm.state = response.data.state;
                vm.country = response.data.country;
                vm.zip = response.data.zip;
            }
        }).catch(function(error){
            $route.reload();
        });

        $scope.canEdit = false;
        $scope.makeEditable = "";
    };

    //Edit Profile
    vm.edit = function(){
        $scope.canEdit = true;
        $scope.makeEditable = "edit-background-profile-info";
    };

    //Cancel Editing
    vm.cancel = function(){
        $scope.canEdit = false;
        $scope.makeEditable = "";
    };

    //Search
    vm.search = function(){
        var city = vm.searchcity;
        var zip = vm.searchzip;
        $location.path('/search').search('city',city).search('zip',zip);
    };

    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        $window.sessionStorage.clear();
        $location.path('/');
    }

    init();
};
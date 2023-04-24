angular.module('bbms').controller('DashboardController', DashboardController);

function DashboardController($http, $window, $scope, $route, $rootScope, baseurl){
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

    //Get info on load
    var init = function(){
        $rootScope.loggedUser = $window.sessionStorage.username;
        $rootScope.role = $window.sessionStorage.role;
        $http.get(baseurl + '/api/entities/' + username).then(function(response){
            if(response.status === 200){
                vm.entityname = response.data.entityname;
                vm.username = response.data.username;
                vm.email = response.data.email;
                vm.street = response.data.street;
                vm.city = response.data.city;
                vm.state = response.data.state;
                vm.country = response.data.country;
                vm.zip = response.data.zip;
                $window.sessionStorage.entityname = response.data.entityname;
                vm.loadinventroy();
                vm.getnotificationcount();
            }
        }).catch(function(error){
        });
    }

    vm.modifyprofile = function(){
        var entity ={
            entityname: vm.entityname,
            street: vm.street,
            city: vm.city,
            email: vm.email,
            state: vm.state,
            country: vm.country,
            zip: vm.zip
        };

        $http.put(baseurl + '/api/entities/' + username, entity).then(function(response){
            if(response.status ===200){
                vm.entityname = response.data.entityname;
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

    vm.edit = function(){
        $scope.canEdit = true;
        $scope.makeEditable = "edit-background-profile-info";
    };

    vm.cancel = function(){
        $scope.canEdit = false;
        $scope.makeEditable = "";
    };

    vm.loadinventroy = function(){
        $http.get(baseurl + '/api/inventory-management/inventory/' + username).then(function(response){
            if(response.status === 200){
                vm.inventoryerror = null;
                $scope.labels = [];
                $scope.data = [];
                for(var i = 0; i< response.data.length; i++){
                    $scope.labels.push(response.data[i].bloodGroup);
                    $scope.data.push(response.data[i].quantity);
                }
            }
        }).catch(function(error){
            if(error.status == 404){
                vm.noinventory = 'It seems you haven\'t configured your Inventory please configure it now.';
            } else{
                vm.inventoryerror = 'Failed to load inventory.';
            }
        });
    };

    vm.configureinventory = function(){
        var entity = {
            username : $window.sessionStorage.username,
            entityName : $window.sessionStorage.entityname
        };

        $http.post(baseurl + '/api/inventory-management/inventory', entity).then(function(response){
            if(response.status === 200){
                vm.noinventory = 'Inventory configured. Please update your inventroy in "Update Inventory" section.'
            }
        }).catch(function(error){
            vm.noinventory = 'Failed! Try again';
        });
    };

    vm.getnotificationcount = function(){
        $http.get(baseurl + '/api/request-management/notifications/' + username).then(function(response){
            if(response.status === 200){
                $rootScope.notificationCount  = response.data;
            }
        }).catch(function(error){
            if(error.status === 404){
                delete $rootScope.notificationCount;
            }
        });
    }
    init();
}
angular.module('bbms').controller('InventoryController', InventoryController);

function InventoryController($http, $route, $window, $location, $timeout, baseurl){
    var vm = this;
    var username = $window.sessionStorage.username;

    var init = function(){
        $http.get(baseurl + '/api/inventory-management/inventory/' + username).then(function(response){
            if(response.status === 200){
                if(response.data.length != 8){
                    vm.inventoryerror = 'Error! Please configure your inventory. If you have already configured your inventory please contact administrator.';
                } else{
                    vm.inventoryerror = null;
                    vm.apositive = response.data[0].quantity;
                    vm.anegative = response.data[1].quantity;
                    vm.bpositive = response.data[2].quantity;
                    vm.bnegative = response.data[3].quantity;
                    vm.abpositive = response.data[4].quantity;
                    vm.abnegative = response.data[5].quantity;
                    vm.opositive = response.data[6].quantity;
                    vm.onegative = response.data[7].quantity;
                }
            }
        }).catch(function(error){
            vm.inventoryerror = 'Error! Please configure your inventory. If you have already configured your inventory please contact administrator.';
        });
    }

    vm.updateinventory = function(){

        var inventory = {
            aPositive : vm.apositive,
            aNegative : vm.anegative,
            bPositive : vm.bpositive,
            bNegative : vm.bnegative,
            abPositive: vm.abpositive,
            abNegative: vm.abnegative,
            oPositive : vm.opositive,
            oNegative : vm.onegative
        }

        $http.put(baseurl + '/api/inventory-management/inventory/' + username, inventory).then(function(response){
            if(response.status === 204){
                vm.updatefail = false;
                vm.updatesuccess = 'Inventroy updated successfully.';
                $timeout(function(){
                    $location.path('/dashboard');
                },1000);
            }
        }).catch(function(error){
            vm.updatefail = 'Failed to update inventory.'
        });
    }

    init();
};
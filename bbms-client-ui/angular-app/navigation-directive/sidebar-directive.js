angular.module('bbms').directive('sideNavigation', sideNavigation);

function sideNavigation(){
  return{
    restrict: 'E',
    templateUrl: 'angular-app/navigation-directive/sidebar-directive.html'
  };
}
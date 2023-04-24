angular.module('bbms', ['ngRoute', 'angular-jwt', 'ui.bootstrap', 'chart.js']).config(config).run(run).constant('baseurl', 'http://localhost:3000');

function config($httpProvider, $routeProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider
        .when('/',{
            templateUrl: 'angular-app/main/main.html',
            access: {
                restricted: false
            }
        })
        .when('/loginuser',{
            templateUrl: 'angular-app/login/login.html',
            controller: LoginController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/registeruser',{
            templateUrl: 'angular-app/register/registeruser.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/loginentity',{
            templateUrl: 'angular-app/login/loginentity.html',
            controller: LoginController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/registerentity',{
            templateUrl: 'angular-app/register/registerentity.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/homeuser',{
            templateUrl: 'angular-app/home/homeuser.html',
            controller: HomeController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/dashboard',{
            templateUrl: 'angular-app/home/dashboard.html',
            controller: DashboardController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/search',{
            templateUrl: 'angular-app/search/searchresults.html',
            controller: SearchController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/myappointments', {
            templateUrl: 'angular-app/appointments/userappointments.html',
            controller: AppointmentController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/viewappointments',{
            templateUrl: 'angular-app/appointments/entityappointments.html',
            controller: EntityAppointmentController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/makerequest',{
            templateUrl: 'angular-app/request/requests.html',
            controller: RequestController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/updateinventory',{
            templateUrl: 'angular-app/inventory/updateinventory.html',
            controller: InventoryController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/eventsmanagement',{
            templateUrl: 'angular-app/events/events.html',
            controller: EventsController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/editevent/:id',{
            templateUrl: 'angular-app/events/editevent.html',
            controller: EditEventController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/addevent',{
            templateUrl: 'angular-app/events/addevent.html',
            controller: EventsController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/broadcast',{
            templateUrl: 'angular-app/broadcast/broadcast.html',
            controller: BroadcastController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/notifications',{
            templateUrl: 'angular-app/notifications/notifications.html',
            controller: NotificationController,
            controllerAs: 'vm',
            access:{
                restricted: true
            }
        })
        .when('/outgoingrequest',{
            templateUrl: 'angular-app/request/outgoingrequests.html',
            controller: RequestController,
            controllerAs: 'vm',
            access:{
                restricted: true
            }
        })
        .when('/superuserlogin', {
            templateUrl: 'angular-app/superuser/superuserlogin.html',
            controller : SuperUserController,
            controllerAs : 'vm',
            access: {
                restricted: false
            }
        })
        .when('/superuserdashboard', {
            templateUrl: 'angular-app/superuser/superuseract.html',
            controller : SuperUserController,
            controllerAs : 'vm',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
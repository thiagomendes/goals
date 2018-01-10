angular.module('goals', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.interceptors.push('tokenInterceptor');
        $locationProvider.html5Mode(true);

        $routeProvider.when('/app/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        });

        $routeProvider.when('/app/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        });

        $routeProvider.when('/app/404', {
            templateUrl: 'partials/404.html',
            controller: 'HomeController'
        });

        $routeProvider.otherwise({ redirectTo: '/app/404' });
    });
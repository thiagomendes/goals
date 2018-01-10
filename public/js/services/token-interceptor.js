angular.module('goals')
    .factory('tokenInterceptor', function ($q, $window, $location) {

        var interceptor = {};

        interceptor.request = function (config) {

            config.headers = config.headers || {};

            if ($window.sessionStorage.token) {
                console.log('Token já existe no session storage e será enviado nas requisições');
                config.headers['x-access-token'] = $window.sessionStorage.token;
            }

            return config;

        };

        interceptor.response = function (response) {

            var token = response.headers('x-access-token');

            if (token) {
                $window.sessionStorage.token = token;
                console.log('Token foi retornado com sucesso e armazenado no session storage');
            }

            return response;
        };

        interceptor.responseError = function (rejection) {

            if (rejection && rejection.status == 401) {
                console.log('Removendo token do session storage');
                delete $window.sessionStorage.token;
                $location.path('/app/login');
            }

            return $q.reject(rejection);
        };

        return interceptor;
    });
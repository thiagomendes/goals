angular.module('goals')
    .controller('LoginController', function ($scope, $http, $location, $window) {

        $scope.user = {};
        $scope.message = '';

        $scope.login = function () {
            $http.post('/api/users/auth', $scope.user).then(function (response) {
                console.log('sucesso:' + response.data);
                $location.path('/app/home')
            }, function (error) {
                if (error.status == 401) {
                    $scope.message = 'Login or password incorrect';
                } else {
                    $scope.message = error.status + ': ' + error.statusText;
                }
            });
        };

        $scope.logout = function () {
            delete $window.sessionStorage.token;
            $location.path('/app/login');
        }

    });
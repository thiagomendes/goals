angular.module('goals')
    .controller('HomeController', function ($scope, $http, $location) {

        $scope.goals = [];
        $scope.message = '';
        $filterParam = '';

        $http.get('/api/goals').success(function (response) {
            $scope.goals = response;
        }).error(function (error) {
            $scope.message = error;
        });

    });
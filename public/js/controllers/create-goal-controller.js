angular.module('goals')
    .controller('CreateGoalController', function ($scope, $location) {

        $scope.goal = {};

        $scope.cancel = function () {
            $location.path('/app/home');
        };
    });
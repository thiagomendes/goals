angular.module('goals')
    .controller('CreateGoalController', function ($scope, $location, $http) {

        $scope.goal = {};
        $scope.message = '';
        $scope.isSuccess = false;
        $scope.isError = false;

        $scope.cancel = function () {
            $location.path('/app/home');
        };

        $scope.submit = function () {

            $scope.goal.totalCost = $scope.goal.totalCost.replace('.', '');
            $scope.goal.totalCost = $scope.goal.totalCost.replace(',', '.');
            $scope.goal.createDate = new Date();

            $http.post('/api/goals', $scope.goal).success(function (response) {
                $scope.message = "Successfully created goal";
                $scope.isSuccess = true;
                $scope.goal = response;
            }).error(function (error) {
                $scope.message = 'An error was encountered while creating the goal (' + error.status + ':' + error.statusText + ')';
                $scope.isError = true;
            });
        };
    });
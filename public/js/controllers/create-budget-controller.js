angular.module('goals')
    .controller('CreateBudgetController', function ($scope, $http, $location, $routeParams) {

        $scope.goal = {};
        $scope.budget = {};
        $scope.message = '';
        $scope.isSuccess = false;
        $scope.isError = false;

        $scope.budget.status = 0;

        $http.get('/api/goals/' + $routeParams.id).success(function (response) {
            $scope.goal = response;
        }).error(function (error) {
            $scope.message = 'An error was encountered while getting the goal (' + error.status + ':' + error.statusText + ')';
            $scope.isError = true;
        });

        $scope.submit = function () {
            $http.post('/api/goals/' + $routeParams.id + '/budgets', $scope.budget).success(function (response) {
                $scope.budget = response;
                $scope.isSuccess = true;
                $scope.message = "Successfully created budget";
            }).error(function (error) {
                $scope.message = 'An error was encountered while creating the budget (' + error.status + ':' + error.statusText + ')';
                $scope.isError = true;
            });
        };

        $scope.cancel = function () {
            $location.path('/app/goals/' + $routeParams.id);
        };

    });
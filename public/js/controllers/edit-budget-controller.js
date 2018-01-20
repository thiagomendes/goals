angular.module('goals')
    .controller('EditBudgetController', function ($scope, $http, $location, $routeParams) {

        $scope.budget = {};
        $scope.message = '';
        $scope.isError = false;

        $scope.budget.status = 0;

        $http.get('/api/goals/' + $routeParams.id + '/budgets/' + $routeParams.budgetId).success(function (response) {
            $scope.budget = response;
        }).error(function (error) {
            $scope.message = 'An error was encountered while getting the budget (' + error.status + ':' + error.statusText + ')';
            $scope.isError = true;
        });

        $scope.submit = function () {
            $http.put('/api/goals/' + $routeParams.id + '/budgets/' + $routeParams.budgetId, $scope.budget).success(function (response) {
                $scope.budget = response;
                redirectToGoalPage();
            }).error(function (error) {
                $scope.message = 'An error was encountered while updating the budget (' + error.status + ':' + error.statusText + ')';
                $scope.isError = true;
            });
        };

        $scope.cancel = function () {
            redirectToGoalPage();
        };

        function redirectToGoalPage() {
            $location.path('/app/goals/' + $routeParams.id);
        };
    });
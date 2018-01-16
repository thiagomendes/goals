angular.module('goals')
    .controller('GoalController', function ($scope, $http, $location, $routeParams) {

        $scope.goal = {};
        $scope.budgets = [];
        $scope.message = '';
        $scope.isError = false;

        $http.get('/api/goals/' + $routeParams.id).success(function (response) {

            $scope.goal = response;
            $scope.goal.expectedBudget = 0;
            $scope.goal.cashBudget = 0;

            $http.get('/api/' + $scope.goal._id + '/budgets').success(function (response) {
                $scope.budgets = response;

                $scope.budgets.forEach(budget => {

                    if (budget.status == 0) {
                        $scope.goal.expectedBudget = ($scope.goal.expectedBudget + budget.amount);
                    } else {
                        $scope.goal.cashBudget = ($scope.goal.cashBudget + budget.amount);
                    }
                });

                $scope.goal.totalBudget = ($scope.goal.expectedBudget + $scope.goal.cashBudget);
                $scope.goal.pendingBudget = ($scope.goal.totalCost - $scope.goal.totalBudget);

                if ($scope.goal.totalBudget == 0) {
                    $scope.goal.percentBar = 0;
                } else {
                    $scope.goal.percentBar = ($scope.goal.totalBudget / $scope.goal.totalCost);
                    $scope.goal.percentBar = ($scope.goal.percentBar * 100).toFixed(0)
                }

            }).error(function (error) {
                $scope.message = 'An error was encountered while getting the goal budgets (' + error.status + ':' + error.statusText + ')';
                $scope.isError = true;
            });

        }).error(function (error) {
            $scope.message = 'An error was encountered while getting the goal (' + error.status + ':' + error.statusText + ')';
            $scope.isError = true;
        });
    });
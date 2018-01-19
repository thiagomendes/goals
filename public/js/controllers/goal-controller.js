angular.module('goals')
    .controller('GoalController', function ($scope, $http, $location, $routeParams) {

        $scope.goal = {};
        $scope.budgets = [];
        $scope.message = '';
        $scope.selectedBudget = {};
        $scope.isError = false;
        $scope.removed = false;

        loadPage();

        function loadPage() {
            $http.get('/api/goals/' + $routeParams.id).success(function (response) {

                $scope.goal = response;
                $scope.goal.expectedBudget = 0;
                $scope.goal.cashBudget = 0;

                $http.get('/api/goals/' + $scope.goal._id + '/budgets').success(function (response) {
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
        };

        $scope.removeGoal = function () {
            $http.delete('/api/goals/' + $scope.goal._id + '/remove_budgets').success(function () {
                $http.delete('/api/goals/' + $scope.goal._id).success(function (response) {
                    $scope.removed = true;
                    // TODO it needs to be better
                    angular.element(document.querySelector('#modal-remove-goal')).modal('hide');
                }).error(function (error) {
                    $scope.message = 'An error was encountered while removing the goal (' + error.status + ':' + error.statusText + ')';
                    $scope.isError = true;
                });
            }).error(function (error) {
                $scope.message = 'An error was encountered while removing the budgets (' + error.status + ':' + error.statusText + ')';
                $scope.isError = true;
            });
        };

        $scope.removeBudget = function () {
            $http.delete('/api/goals/' + $scope.goal._id + '/budgets/' + $scope.selectedBudget._id).success(function (response) {
                loadPage();
                // TODO it needs to be better
                angular.element(document.querySelector('#modal-remove-budget')).modal('hide');
            }).error(function (error) {
                $scope.message = 'An error was encountered while removing the budget (' + error.status + ':' + error.statusText + ')';
                $scope.isError = true;
            });
        };

        $scope.setSelectedBudget = function (budget) {
            $scope.selectedBudget = budget;
        }
    });
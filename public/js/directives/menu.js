angular.module('goals')
    .directive('menu', function () {

        var ddo = {};
        ddo.restrict = 'AE';
        ddo.templateUrl = 'js/directives/menu.html';
        return ddo;

    });
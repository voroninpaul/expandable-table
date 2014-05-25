'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('expandableTable', function ($templateCache, $compile) {
            return {
                restrict: 'E',
                replace: 'true',
                scope: {
                    scopeModels: '=ngModel',
                    expandableTableOptions: '=',
                    traversedParams: '=',
                    cellTemplate: '@',
                    detailTemplate: '@'
                },
                controller: 'accordionCtrl',
                templateUrl: 'src/expandable-table.html',
                link: function (scope, element, attrs, ctrl) {}
            }
        })
        .controller('accordionCtrl', function ($scope, tableService) {
            var expandableTableOptions = expandableTableOptions || {};

            $scope.rowModels = tableService.getModels($scope.scopeModels);

            $scope.headings = tableService.getHeadings($scope.rowModels, $scope.expandableTableOptions.fields);

            $scope.$watchCollection('scopeModels', function (models) {
                tableService.syncModels(models, $scope.rowModels);
            });
        });
})(angular, _)

'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('expandableTable', function ($templateCache, $compile) {
                return {
                    restrict: 'E',
                    replace: 'true',
                    scope: {
                        scopeModels: '=ngModel',
                        detailLayout: '@detailLayout'
                    },
                    controller: 'accordionCtrl',
                    templateUrl: 'src/expandable-table.html',
                    link: function (scope, element, attrs, ctrl) {

                    }
                }
            }
        )
        .controller('accordionCtrl', function ($scope, tableService) {
            $scope.models = tableService.getModels($scope.scopeModels);

            $scope.headings = tableService.getHeadings($scope.models);

            $scope.$watchCollection('scopeModels', function (model) {
                $scope.models = tableService.getModels($scope.scopeModels);
            });

            $scope.toggleLayout = function (model) {
                model.active = !model.active;

                if (model.active) {
                    _.each($scope.models, function (value, key) {

                        if (value !== model) {
                            value.active = false;
                        }
                    });
                }
            };
        });
})(angular, _)

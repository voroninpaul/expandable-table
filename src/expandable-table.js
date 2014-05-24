'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('expandableTable', function ($templateCache, $compile) {
            return {
                restrict: 'E',
                replace: 'true',
                scope: {
                    scopeModels: '=ngModel',
                    cellTemplate: '@',
                    detailTemplate: '@',
                    inheritedParams: '='
                },
                controller: 'accordionCtrl',
                templateUrl: 'src/expandable-table.html',
                link: function (scope, element, attrs, ctrl) {

                }
            }
        })
        .controller('accordionCtrl', function ($scope, tableService) {
            $scope.rowModels = tableService.getModels($scope.scopeModels);
            $scope.headings = tableService.getHeadings($scope.rowModels);

            $scope.$watchCollection('scopeModels', function (models) {
                var modelsToAdd = [];
                var modelsToRemove = [];

                _.each(models, function (model) {
                    var isPresent = _.find($scope.rowModels, function (rowModel) {
                        return rowModel.model === model;
                    });

                    if (!isPresent) {
                        modelsToAdd.push(model);
                    }
                });

                _.each($scope.rowModels, function (rowModel) {
                    var isPresent = _.find(models, function (model) {
                        return rowModel.model === model;
                    });

                    if (!isPresent) {
                        modelsToRemove.push(rowModel);
                    }
                });

                _.each(modelsToRemove, function (rowModel) {
                    var index = _.indexOf($scope.rowModels, rowModel)

                    $scope.rowModels.splice(index, 1);
                });

                _.each(modelsToAdd, function (model) {
                    $scope.rowModels.push(tableService.createModel(model))
                });
            });

            $scope.toggleLayout = function (model) {
                model.active = !model.active;
            };
        });
})(angular, _)

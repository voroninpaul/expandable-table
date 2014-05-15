'use strict';
(function (angular, _) {
    angular.module('accordion.table', [
        'accordion.table.templates'
    ])
        .directive('accordionTable', [
            '$templateCache',
            '$compile',
            function ($templateCache, $compile) {
                return {
                    restrict: 'E',
                    replace: 'true',
                    scope: {
                        models: '=ngModel',
                        detailLayout: '@detailLayout'
                    },
                    controller: 'accordionCtrl',
                    templateUrl: 'src/accordion-table.html',
                    link: function (scope, element, attrs, ctrl) {
                        //ctrl.detailTpl = $compile(scope.detailLayout);

//                    _.each(element[0].querySelectorAll('.detail-layout'), function (element) {
//                        debugger;
//
//                    });
                    }
                }
            }
        ])
        .controller('accordionCtrl', ['$scope', function ($scope) {
            this.getCollNames = function () {
                var model = $scope.models[0];

                return _.keys(model);
            };

            $scope.colNames = this.getCollNames();
        }])
        .directive('tableCell', function ($compile, $templateCache) {
            return {
                restrict: 'A',
                require: '^accordionTable',
                template: '<div></div>',
                link: function (scope, element, attrs) {
                    //var detailTpl = $compile(scope.detailLayout);


                    scope.$watch('detailLayout', function (tplId) {
                        var tpl = $templateCache.get(tplId);
                        var childScope = scope.$new(true);

                        childScope.test = scope.model;
                        //compile the element with its new content and new scope
                        element.html(tpl);
                        $compile(element.contents())(childScope);
                    });
                }
            }
        });
})(angular, _)

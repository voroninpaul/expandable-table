'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('cellLayout', function ($compile, $templateCache) {
            return {
                restrict: 'A',
                require: '^expandableTable',
                templateUrl: 'src/cell-layout.html',
                link: function (scope, element, attrs) {
                    //scope.cellData = scope.rowModel.model[scope.heading.prop];
                    scope.model = scope.rowModel.model;
                    scope.prop = scope.heading.prop;

                    scope.$watch('cellTemplate', function (tplId) {
                        var tpl = $templateCache.get(tplId);
                        var childScope = scope.$new();

                        childScope.model = scope.rowModel.model;
                        childScope.prop = scope.heading.prop;

                        //compile the element with its new content and new scope
                        element.html(tpl);
                        $compile(element.contents())(childScope);
                    });
                }
            }
        });
})(angular, _)

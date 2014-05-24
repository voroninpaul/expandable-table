'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('cellLayout', function ($compile, $templateCache) {
            return {
                restrict: 'A',
                require: '^expandableTable',
                templateUrl: 'src/cell-layout.html',
                link: function (scope, element, attrs) {
                    scope.$watch('cellTemplate', function (tplId) {
                        var tpl = $templateCache.get(tplId);
                        var childScope = scope.$new();

                        childScope.cellData = scope.rowModel.model[scope.heading];

                        //compile the element with its new content and new scope
                        element.html(tpl);
                        $compile(element.contents())(childScope);
                    });
                }
            }
        });
})(angular, _)

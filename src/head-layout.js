'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('headLayout', function ($compile, $templateCache) {
            return {
                restrict: 'A',
                require: '^expandableTable',
                templateUrl: 'src/head-layout.html',
                link: function (scope, element, attrs) {
                    scope.$watch('headTemplate', function (tplId) {
                        var tpl = $templateCache.get(tplId);
                        var childScope = scope.$new();

                        //compile the element with its new content and new scope
                        element.html(tpl);
                        $compile(element.contents())(childScope);
                    });
                }
            }
        });
})(angular, _)

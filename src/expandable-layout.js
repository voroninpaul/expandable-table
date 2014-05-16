'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('expandableLayout', function ($compile, $templateCache) {
            return {
                restrict: 'A',
                require: '^expandableTable',
                template: 'src/expandable-layout.html',
                link: function (scope, element, attrs) {
                    scope.$watch('detailLayout', function (tplId) {
                        var tpl = $templateCache.get(tplId);
                        var childScope = scope.$new(true);
                        childScope.model = scope.model.model;

                        //compile the element with its new content and new scope
                        element.html(tpl);
                        $compile(element.contents())(childScope);
                    });
                }
            }
        });
})(angular, _)

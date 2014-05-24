'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .directive('detailLayout', function ($compile, $templateCache) {
            return {
                restrict: 'A',
                require: '^expandableTable',
                template: '<div></div>',
                link: function (scope, element, attrs) {
                    scope.$watch('detailTemplate', function (tplId) {
                        var tpl = $templateCache.get(tplId);
                        var childScope = scope.$new();
                        childScope.rowModel = scope.rowModel;
                        childScope.domainModel = scope.rowModel.model

                        //compile the element with its new content and new scope
                        element.html(tpl);
                        $compile(element.contents())(childScope);
                    });
                }
            }
        });
})(angular, _)

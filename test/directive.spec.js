/*global describe, beforeEach*/
'use strict';

describe('Accordion Table', function () {
    var $compile, $timeout, scope, element, $document, container;

    var users = [
        {name: 'vasya', age: 21 },
        {name: 'petya', age: 30 },
        {name: 'kolya', age: 35 }
    ];

    beforeEach(module('accordion.table'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _$document_) {
        scope = _$rootScope_;
        $compile = _$compile_;
        $timeout = _$timeout_;
        $document = _$document_;
    }));

    describe('Accordion Table directive', function () {
        beforeEach(function(){
            scope.users = angular.copy(users);
            element = angular.element('<accordion-table ng-model="users"></accordion-table>');
            $document.find('body').append(element);

            element = $compile(element)(scope);
            scope.$digest();
        });

        it('should contain tag list with correct tags', function(){
            expect($document.find('table').length).toBe(1);
        });
    });
});


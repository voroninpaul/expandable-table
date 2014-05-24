'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .service('tableService', function () {
            function Row (model) {
                this.active = false;
                this.model = model;
            }

            return {
                getModels: function (scopeModels) {
                    var models = [];

                    _.each(scopeModels, function (scopeModel) {
                        var row = new Row(scopeModel);

                        models.push(row);
                    });

                    return models;
                },
                getHeadings: function (models) {
                    return _.keys(models[0].model)
                },
                createModel: function (model) {
                    return new Row(model);
                }
            };
        });
})(angular, _);
'use strict';
(function (angular, _) {
    angular.module('expandableTable')
        .service('tableService', function () {
            function Row (model) {
                this.active = false;
                this.model = model;
            }

            function Col (prop, label) {
                this.prop = prop;
                this.label = label;
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
                getHeadings: function (models, mapping) {
                    var headings = [];

                    _.forOwn(models[0].model, function (value, key) {
                        var keyIndex = _.findIndex(mapping, function (mappingElem) {
                            return mappingElem[key] !== undefined;
                        });

                        if (keyIndex != -1) {
                            headings[keyIndex] = new Col(key, mapping[keyIndex][key]);
                        } else {
                            //headings.push(key);
                        }
                    });

                    return headings;
                },
                createModel: function (model) {
                    return new Row(model);
                },
                syncModels: function (newModels, rowModels) {
                    var modelsToAdd = [];
                    var modelsToRemove = [];
    
                    _.each(newModels, function (model) {
                        var isPresent = _.find(rowModels, function (rowModel) {
                            return rowModel.model === model;
                        });
    
                        if (!isPresent) {
                            modelsToAdd.push(model);
                        }
                    });
    
                    _.each(rowModels, function (rowModel) {
                        var isPresent = _.find(newModels, function (model) {
                            return rowModel.model === model;
                        });
    
                        if (!isPresent) {
                            modelsToRemove.push(rowModel);
                        }
                    });
    
                    _.each(modelsToRemove, function (rowModel) {
                        var index = _.indexOf(rowModels, rowModel)
    
                        rowModels.splice(index, 1);
                    });
    
                    _.each(modelsToAdd, function (model) {
                        rowModels.push(tableService.createModel(model))
                    });
                }
            };
        });
})(angular, _);
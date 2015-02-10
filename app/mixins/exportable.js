import Ember from 'ember';
import displayValue from "kingmesaj/utils/display-value";
export default Ember.Mixin.create({
    isExportable: function() {
        if (!this.get("export")) return false;
        return true;
    },
    getHeaderRow: function() {
        return new Promise(function(resolve) {
            var data = [];
            for (var field in this.get("export.fields")) {
                var column = this.get("export.fields")[field];
                data.push(column.label);
            }
            var dynamicFieldPromises = [];
            for (field in this.get("export.dynamicFields")) {
                dynamicFieldPromises.push(this.get(field));
            }
            Promise.all(dynamicFieldPromises).then(function(dynamicFields) {
                dynamicFields.forEach(function(dynamicField) {
                    dynamicField.forEach(function(field) {
                        data.push(field.get("label"));
                    });
                });
                resolve(data);
            });
        }.bind(this));
    },
    getDataRow: function() {
        return new Promise(function(resolve) {
            var data = [];
            for (var field in this.get("export.fields")) {
                var column = this.get("export.fields")[field];
                if (!column.exportFn) data.push(displayValue(this.get(field), column.type));
                else data.push(column.exportFn(this.get(field)));
            }
            var dynamicFieldPromises = [];
            for (field in this.get("export.dynamicFields")) {
                dynamicFieldPromises.push(this.get(field));
            }
            Promise.all(dynamicFieldPromises).then(function(dynamicFields) {
                dynamicFields.forEach(function(dynamicField) {
                    dynamicField.forEach(function(field) {
                        data.push(displayValue(field.get("value"), field.get("type")));
                    });
                });
                resolve(data);
            });
        }.bind(this));
    }
});

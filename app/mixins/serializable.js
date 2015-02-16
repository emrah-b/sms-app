import Ember from 'ember';
import displayValue from "kingmesaj/utils/display-value";
import importValue from "kingmesaj/utils/import-value";

export default Ember.Mixin.create({
    _values: Ember.A([]),
    _labels: Ember.A([]),
    _types: Ember.A([]),
    _fields: Ember.A([]),
    _dynamicFields: Ember.A([]),
    isSerializable: function() {
        if (!this.get("serialization")) return false;
        return true;
    },
    serialize: function(valuesOnly) {
        this.set("_values", Ember.A([]));
        this.set("_types", Ember.A([]));
        this.set("_labels", Ember.A([]));
        this.set("_fields", Ember.A([]));
        this.set("_dynamicFields", Ember.A([]));
        this.set("_loadedDynamicColumns", null);
        this.set("_expectedDynamicColumns", null);
        for (var field in this.serialization.fields) {
            this.get("_values").push(this.get(field));
            this.get("_types").push(this.serialization.fields[field].type);
            if (valuesOnly) continue;
            this.get("_labels").push(this.serialization.fields[field].label);
            this.get("_fields").push(field);
        }
        for (var dynamicField in this.serialization.dynamicFields) {
            var valuePath = this.serialization.dynamicFields[dynamicField].valuePath.split('.');
            var typePath = this.serialization.dynamicFields[dynamicField].typePath.split('.');
            if (!valuesOnly) {
                var labelPath = this.serialization.dynamicFields[dynamicField].labelPath.split('.');
                var miscPath = this.serialization.dynamicFields[dynamicField].miscPath.split('.');
            }
            this.get(dynamicField).then(function(dynamicFieldEntries) {
                var serializationFactor = (valuesOnly) ? 2 : 4;
                this.incrementProperty("_expectedDynamicColumns", dynamicFieldEntries.get("length") * serializationFactor);
                dynamicFieldEntries.forEach(function(dynamicFieldEntry) {
                    this.resolveAndPush(dynamicFieldEntry, valuePath, this.get("_values"));
                    this.resolveAndPush(dynamicFieldEntry, typePath, this.get("_types"));
                    if (!valuesOnly) {
                        this.resolveAndPush(dynamicFieldEntry, labelPath, this.get("_labels"));
                        this.resolveAndPush(dynamicFieldEntry, miscPath, this.get("_dynamicFields"));
                    }
                }.bind(this));
            }.bind(this));
        }
        return new Promise(function(resolve) {
            this.set("_resolveSerialize", resolve);
        }.bind(this));
    },
    resolveAndPush: function(obj, path, pushArray) {
        if (path.length === 1) {
            pushArray.push(obj.get(path[0]));
            this.incrementProperty("_loadedDynamicColumns");
        } else {
            obj.get(path[0]).then(function(firstStop) {
                pushArray.push(firstStop.get(path[1]));
                this.incrementProperty("_loadedDynamicColumns");
            }.bind(this));
        }
    },
    serializationReady: function() {
        var noDynamicFields = this.serialization.dynamicFields.length === 0;
        var dynamicFieldsLoaded = this.get("_expectedDynamicColumns") === this.get("_loadedDynamicColumns");
        if (noDynamicFields || dynamicFieldsLoaded) {
            var resolve = this.get("_resolveSerialize");
            if (resolve) {
                var data = {
                    labels: this.get("_labels"),
                    values: this.get("_values"),
                    types: this.get("_types"),
                    fields: this.get("_fields").concat(this.get("_dynamicFields").map(function(field) {
                        return {
                            info: field,
                            dynamic: true
                        };
                    })),
                    displayValues: this.getDisplayValues(this.get("_values"), this.get("_types"))
                };
                resolve(data);
            }
        }
    }.observes("_loadedDynamicColumns"),
    fromJson: function(json, template) {
        for (var label in json) {
            var index = template.labels.indexOf(label);
            if(index === -1) continue;
            var field = template.fields[index];
            var type = template.types[index];
            
            if(!field.dynamic) this.set(field, importValue(json[label], type));
            else{
            	this.serialization.importDynamicField.bind(this)(json[label], type, field.info);
            }
        }

        return this;
    },
    getDisplayValues: function(values, types) {
        var displayValues = [];
        for (var i = 0; i < values.length; i++) {
            var val = values[i];
            var type = types[i];
            displayValues.push(displayValue(val, type));
        }
        return displayValues;
    }
});

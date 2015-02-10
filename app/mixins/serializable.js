import Ember from 'ember';
import displayValue from "kingmesaj/utils/display-value";
export default Ember.Mixin.create({
    _values: Ember.A([]),
    _labels: Ember.A([]),
    _types: Ember.A([]),
    _fields: Ember.A([]),
    isSerializable: function() {
        if (!this.get("serialization")) return false;
        return true;
    },
    serialize: function() {
    	this.set("_values", Ember.A([]));
        this.set("_types", Ember.A([]));
        this.set("_labels", Ember.A([]));
        this.set("_fields", Ember.A([]));
        this.set("_loadedDynamicColumns", null);
        this.set("_expectedDynamicColumns", null);

        for (var field in this.serialization.fields) {
            this.get("_values").push(this.get(field));
            this.get("_types").push(this.serialization.fields[field].type);
            this.get("_labels").push(this.serialization.fields[field].label);
            this.get("_fields").push(field);
        }
        for (var dynamicField in this.serialization.dynamicFields) {
            var valuePath = this.serialization.dynamicFields[dynamicField].valuePath.split('.');
            var labelPath = this.serialization.dynamicFields[dynamicField].labelPath.split('.');
            var typePath = this.serialization.dynamicFields[dynamicField].typePath.split('.');
            var miscPath = this.serialization.dynamicFields[dynamicField].miscPath.split('.');
            this.get(dynamicField).then(function(dynamicFieldEntries) {
                this.incrementProperty("_expectedDynamicColumns", dynamicFieldEntries.get("length") * 4);
                dynamicFieldEntries.forEach(function(dynamicFieldEntry) {
                    this.resolveAndPush(dynamicFieldEntry, valuePath, this.get("_values"));
                    this.resolveAndPush(dynamicFieldEntry, labelPath, this.get("_labels"));
                    this.resolveAndPush(dynamicFieldEntry, typePath, this.get("_types"));
                    this.resolveAndPush(dynamicFieldEntry, miscPath, this.get("_fields"));
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
                    fields: this.get("_fields"),
                    displayValues: this.getDisplayValues(this.get("_values"), this.get("_types"))
                };
                resolve(data);
            }
        }
    }.observes("_loadedDynamicColumns"),
    fromJson: function(json) {
        this.serialize().then(function(serialized) {
            for (var label in json) {
                var index = serialized.labels.indexOf(label);
                var field = serialized.fields[index];
                var type = serialized.types[index];
                if(!field.dynamic) this.set(field, json[label]);
                // if(!field.dynamic) this.set(field, importValue(json[label], type));

            }
        })
    },
    getDisplayValues: function(values, types) {
    	var displayValues = [];
    	for(var i = 0; i < values.length ; i ++){
    		var val = values[i];
    		var type = types[i];
    		displayValues.push(displayValue(val, type));
    	}
    	return displayValues;
    }
});

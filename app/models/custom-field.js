import DS from 'ember-data';

var CustomField = DS.Model.extend({
    label: DS.attr("string"),
    type: DS.attr("string")
});



export default CustomField;

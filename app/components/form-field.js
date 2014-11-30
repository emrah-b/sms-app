import Ember from 'ember';

export default Ember.Component.extend({
	isCheckBox: function() {
		return this.get("type") === "checkbox";
	}.property("type"),
	isDate: function() {
		return this.get("type") === "date";
	}.property("type"),
	isTextArea: function() {
		return this.get("type") === "textarea";
	}.property("type")
});

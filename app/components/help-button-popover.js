import Ember from 'ember';

export default Ember.Component.extend({
	tagName: "i",
	classNames: ["help-button popovers"],
	attributeBindings: ["data-content", "data-trigger", "data-rel", "data-original-title"],
	"data-trigger": "hover",
	"data-rel": "popover",
	"data-original-title": function() {
		if(this.get("title")) return this.get("title");
		return "Bilgi";
	}.property("title"),
	"data-content": function() {
		return this.get("text");
	}.property("text"),

});

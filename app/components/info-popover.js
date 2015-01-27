import Ember from 'ember';

export default Ember.Component.extend({
    tagName: "i",
    classNames: ["info-button popovers"],
    classNameBindings: ["error", "info"],
    attributeBindings: ["data-content", "data-trigger", "data-rel", "data-original-title", "error", "info", "data-placement"],
    info: true,
    error: false,
    "data-placement": "left",
    "data-trigger": "hover",
    "data-rel": "popover",
    "data-original-title": function() {
        if (this.get("title")) return this.get("title");
        return "Bilgi";
    }.property("title"),
    "data-content": function() {
        return this.get("text");
    }.property("text"),

});

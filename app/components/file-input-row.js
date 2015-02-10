import Ember from 'ember';

export default Ember.Component.extend({
	valueChanged: function(){
		var val = this.get("value") || "";
		this.set("fileName", val.replace(/^.+\\/, ''));
	}.observes("value"),
	actions: {
		removeFile: function(){
			this.set("value", undefined);
		}
	}
});

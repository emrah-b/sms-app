import Ember from 'ember';

export default Ember.Component.extend({
	max: 100,
	valueNow: 1,
	percentage: function() {
		return ((this.get("valueNow") || 1) / (this.get("max") || 100)) * 100 ;
	}.property("valueNow", "max"),
	progressBarStyle: function(){
		return "width: " + this.get("percentage") + "%";
	}.property("percentage")
});

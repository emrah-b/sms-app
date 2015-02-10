import Ember from 'ember';

export default Ember.View.extend({
	tagName: "div",
	classNames: ["animated", "pulse", "border-while-pulsing"],
	didInsertElement: function() {
		this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			this.$().removeClass("border-while-pulsing")
		}.bind(this));
	}
});

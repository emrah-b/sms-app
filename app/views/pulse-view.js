import Ember from 'ember';

export default Ember.View.extend({
	tagName: "div",
	classNames: ["animated", "pulse"],
	didInsertElement: function() {
		this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			var container = this.$().parent();
            container.scrollTo(this.$(), 800);
		}.bind(this));
	}
});

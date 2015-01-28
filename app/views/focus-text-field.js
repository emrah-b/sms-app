import Ember from 'ember';

export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  },
  keyUp: function(e){
  	if(e.which === 27)
	  	this.sendAction('escapePressed', e);
  }
});

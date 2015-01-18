import Ember from 'ember';

export default Ember.View.extend({
	tagName: "pre",
	template: Ember.Handlebars.compile('{{view.stringifiedJson}}')
});

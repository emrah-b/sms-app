import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['swMain'],
    didInsertElement: function() {
        this.$().smartWizard();
    },
    indexedSteps: function() {
    	var steps = this.get("steps");
        for (var i = steps.length - 1; i >= 0; i--) {
            steps[i].index = i + 1;
            steps[i].link = "#step-" + (i + 1);
            steps[i].selected = i == 0;
        }

        return steps;
    }.property('steps')
});

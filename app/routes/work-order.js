import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render();
        this.render('subview-toolbar', {
            outlet: 'extraButtons',
            into: 'report'
        });
    },
    actions: {
        goBack: function() {
            var that = this;
            Ember.$(".subviews").removeClass("slideInRight").addClass("fadeOutRight");
            Ember.run.later(function() {
                that.transitionTo('report');

            }, 300);
        }
    }
});

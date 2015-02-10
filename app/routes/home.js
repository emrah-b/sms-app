import Ember from 'ember';
export default Ember.Route.extend({
    activate: function() {
        // var cssClass = "sidebar-close";
        // // you probably don't need the application class
        // // to be added to the body
        // if (cssClass != 'application') {
        //     Ember.$('body').addClass(cssClass);
        // }
    },
    deactivate: function() {
        // Ember.$('body').removeClass("sidebar-close");
    }
});

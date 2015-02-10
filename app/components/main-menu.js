import Ember from 'ember';
export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['main-navigation-menu'],
    didInsertElement: function() {
        var body = Ember.$('body'),
            mainNavigation = Ember.$('.main-navigation');
        if (body.hasClass("isMobile") === false) {
            mainNavigation.perfectScrollbar({
                wheelSpeed: 50,
                minScrollbarLength: 20,
                suppressScrollX: true
            });
        }
        this.$().dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'slow',
            showCount: false,
            autoExpand: true,
            classExpand: 'dcjq-current-parent'
        });
    }
});

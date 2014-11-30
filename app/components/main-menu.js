import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['main-navigation-menu'],
  didInsertElement: function(){
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
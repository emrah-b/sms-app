import Ember from 'ember';

export default Ember.View.extend({
	tagName: "div",
	classNames: ["perfect-scroll-container"],
	wheelSpeed: 1,
    wheelPropagation: false,
    swipePropagation: true,
    minScrollbarLength: null,
    maxScrollbarLength: null,
    useBothWheelAxes: false,
    useKeyboard: true,
    suppressScrollX: true,
    suppressScrollY: false,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    includePadding: false,
	didInsertElement: function(){
		var self = this;

        this.$().perfectScrollbar({
            wheelSpeed: self.get('wheelSpeed'),
            wheelPropagation: self.get('wheelPropagation'),
            swipePropagation: self.get('swipePropagation'),
            minScrollbarLength: self.get('minScrollbarLength'),
            maxScrollbarLength: self.get('maxScrollbarLength'),
            useBothWheelAxes: self.get('useBothWheelAxes'),
            useKeyboard: self.get('useKeyboard'),
            suppressScrollX: self.get('suppressScrollX'),
            suppressScrollY: self.get('suppressScrollY'),
            scrollXMarginOffset: self.get('scrollXMarginOffset'),
            scrollYMarginOffset: self.get('scrollYMarginOffset'),
            includePadding: self.get('includePadding')
        });
	}
});

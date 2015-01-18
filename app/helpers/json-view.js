import Ember from 'ember';
import ExpandJsonView from '../views/expand-json'

// export function jsonView(context, options) {
// 	options.contexts = [this].concat(options.contexts);
//     options.hash.stringifiedJson = JSON.stringify(context, null, 3);

// 	return Ember.Handlebars.helpers.view.call(this, ExpandJsonView, options);
// };

export default Ember.Handlebars.makeBoundHelper(function(context, options) {
	debugger;
    var view = options.data.view;
    var viewOptions = {
        shouldDisplayFunc: function() {return true;},
        // template: options.fn,
        inverseTemplate: options.inverse,
        isEscaped: !options.hash.unescaped,
        templateData: options.data,
        templateHash: options.hash,
        stringifiedJson: context
    };
    var childView = view.createChildView(ExpandJsonView, viewOptions);
    view.appendChild(childView);
});

// export default Ember.Handlebars.makeBoundHelper(jsonView);

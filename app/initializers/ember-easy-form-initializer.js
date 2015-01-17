export function initialize( /* container, application */ ) {
    Ember.EasyForm.Config.registerWrapper('default', {
        formClass: 'form-horizontal',
        fieldErrorClass: 'has-error',
        errorClass: 'help-block',
        hintClass: 'help-inline  col-sm-2 display-info-icon',
        labelClass: 'control-label col-sm-2',
        inputClass: 'form-group',
        inputTemplate: 'easyForm-extensions/horizontal-input',
    });

    Ember.EasyForm.Config.registerWrapper('vertical-form', {
        fieldErrorClass: 'has-error',
        errorClass: 'help-block',
        hintClass: 'help-block',
        inputClass: 'form-group',
        inputTemplate: 'easyForm-extensions/vertical-input',
    });
}

export default {
    name: 'ember-easy-form-initializer',
    initialize: initialize
};

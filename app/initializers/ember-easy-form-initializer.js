export function initialize( /* container, application */ ) {
    Ember.EasyForm.Input.reopen({
        inputOptions: ["data-original-title"]
    });

    Ember.EasyForm.Config.registerWrapper('horizontal-form', {
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

    Ember.EasyForm.Config.registerWrapper('inline-form', {
        formClass: "form-inline",
        fieldErrorClass: 'has-error',
        errorClass: 'help-inline',
        hintClass: 'help-inline error',
        inputClass: 'form-group',
        inputTemplate: 'easyForm-extensions/vertical-input',
        labelClass: 'control-label',
        buttonClass: 'btn btn-primary'
    });
}

export default {
    name: 'ember-easy-form-initializer',
    initialize: initialize
};

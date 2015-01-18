import InputMask from "../components/input-mask";

export function initialize( /* container, application */ ) {
    Ember.EasyForm.Input.reopen({
        inputOptions: ["maskedValue", "mask"],
        bindableInputOptions: ["maskedValue", "mask"]
    });
    Ember.EasyForm.Config.registerInputType('masked', InputMask);
}

export default {
    name: 'ember-easy-form-inputmask',
    initialize: initialize
};

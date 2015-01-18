import DatePicker from "../components/date-picker";

export function initialize( /* container, application */ ) {
    Ember.EasyForm.Input.reopen({
        inputOptions: ["format", "yearRange"]
    });
    Ember.EasyForm.Config.registerInputType('datepicker', DatePicker);
}

export default {
    name: 'ember-easy-form-datetimepicker',
    initialize: initialize
};

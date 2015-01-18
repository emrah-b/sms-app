import Select2 from '../components/select-2';

export function initialize( /* container, application */ ) {
    Ember.EasyForm.Config.registerInputType('select2', Select2);
};

export default {
    name: 'ember-easy-form-select2',
    initialize: initialize
};

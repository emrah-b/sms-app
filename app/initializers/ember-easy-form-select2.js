import Select2 from '../components/select-2';

export function initialize( /* container, application */ ) {
    Ember.EasyForm.Input.reopen({
        inputOptions: ["collection"]
    });

    var s1 = Select2.extend({
    	attributeBindings: ["collection", "multiple", "placeholder"],
    });

    var select2View = Ember.EasyForm.Select.reopen({
        didInsertElement: function() {
            var context = this;
            Ember.run.scheduleOnce('afterRender', this, 'didRenderElement');
            Ember.addObserver(this, 'controller.' + this.get('collection'),
                function() {
                    Ember.run.scheduleOnce('afterRender', context,
                        context.elementToWidget);
                });
        },
        didRenderElement: function() {
            if (!this.$()) {
                return;
            }

            // fix multiple selects: no selected option on load     
            if (this.$().prop('multiple') && this.$().find('option:selected').length == 0) {
                this.$().val('').change();
            }

            this.$().select2({
                placeholder: this.get('placeholder')
            });

        },
        willDestroyElement: function() {
            this.$().select2("destroy");
        }
    });

    Ember.EasyForm.Config.registerInputType('select2', s1);

};

export default {
    name: 'ember-easy-form-select2',
    initialize: initialize
};

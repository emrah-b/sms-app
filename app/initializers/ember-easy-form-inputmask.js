export function initialize( /* container, application */ ) {
    Ember.EasyForm.Input.reopen({
        inputOptions: ["maskedValue", "mask"],
        bindableInputOptions: ["maskedValue", "mask"]
    });
    Ember.EasyForm.Config.registerInputType('masked', Ember.Component.extend({
        tagName: "input",
        attributeBindings: ["type"],
        mask: '',
        showMaskOnFocus: true,
        showMaskOnHover: true,
        rightAlign: false,
        clearIncomplete: true,
        greedyMask: false,

        // Strangely enough, if we initialize the options object on the component itself
        // it's shared between all instances of the object. Since we don't want that, and
        // we do want to store options somewhere, we need to initialize an options object
        // whenever we create an `input-mask`.
        initializeOptions: function() {
            this.set('options', {});
        }.on('init'),

        // Initialize the mask by forcing a
        // call to the updateMask function
        didInsertElement: function() {
            this.propertyDidChange('mask');
            
            if(this.get("value"))
                this.$().val(this.get("value"));
        },

        // Remove the mask from the input
        teardownMask: function() {
            this.$().inputmask('remove');
        }.on('willDestroyElement'),

        setMask: function() {
            var mask = this.get('mask'),
                options = this.get('options');

            this.$().inputmask('remove');
            this.$().inputmask(mask, options);

            // If the mask has changed, we need to refocus the input to show the
            // proper mask preview. Since the caret is not positioned by the focus
            // even, but the click event, we need to trigger a click as well.
            if (this.$().is(':focus')) {
                this.$().blur().focus().click();
            }
        },

        // Update the mask whenever the mask itself changes or one of the options changes.
        // This observer is meant to be extensible so that other fields can add options
        // (See `decimal-input`), which is why the actual setting of the mask is handled
        // in another function.
        updateMask: function() {
            if (this.get('mask').toLowerCase() === 'regex') {
                // Regex has to capitalized for the plugin, but that's annoying
                // so let's just allow users to enter it however they want...
                this.set('mask', 'Regex');

                // Note: I like pattern better, but I'll leave regex in as an option
                // as well since that's what the plugin defines on the options hash
                this.set('options.regex', this.get('pattern') || this.get('regex'));
            }

            var that = this;

            this.setProperties({
                'options.showMaskOnFocus': this.get('showMaskOnFocus'),
                'options.showMaskOnHover': this.get('showMaskOnHover'),
                'options.rightAlign': this.get('rightAlign'),
                'options.clearIncomplete': this.get('clearIncomplete'),
                'options.greedy': this.get('greedyMask')
            });

            this.setMask();
        }.observes('mask', 'showMaskOnFocus', 'showMaskOnHover', 'rightAlign', 'clearIncomplete', 'greedyMask', 'pattern', 'regex'),

        keyUp: function() {
            this.set("maskedValue", this.$().val());
            this.set("value", this.$().inputmask('unmaskedvalue'));
            // this.$().val(this.get("maskedValue"));

        }
    }));
};

export default {
    name: 'ember-easy-form-inputmask',
    initialize: initialize
};

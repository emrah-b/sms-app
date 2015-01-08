import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['swMain'],
    didInsertElement: function() {
        this.$().smartWizard({
            keyNavigation: false
        });

        this.updateProgressBar();

    },
    indexedSteps: function() {
        var steps = this.get("steps");
        for (var i = steps.length - 1; i >= 0; i--) {
            steps[i].index = i + 1;
            steps[i].link = "#step-" + (i + 1);
            steps[i].domId = "step-" + (i + 1);
            steps[i].selected = i == 0;
        }

        return steps;
    }.property('steps'),
    currentStep: function() {
        return 1;
    }.property(),
    updateProgressBar: function() {
        var currStep = this.get("currentStep") || 1;
        var valueNow = Math.floor(100 / this.get("steps").length * currStep);
        $('.step-bar').css('width', valueNow + '%');
    }.observes("currentStep"),
    isFirstStep: function() {
        return this.get("currentStep") === 1;
    }.property("currentStep"),
    isLastStep: function() {
        if (!this.get("steps")) return false;

        return this.get("currentStep") === this.get("steps").length;
    }.property("currentStep"),
    actions: {
        goForward: function() {
            var onComplete = this.get("steps")[this.get("currentStep") - 1].onComplete;
            
            if ((onComplete && onComplete(this.get("controller"), this.get("model"))) || !onComplete) {
                this.$().smartWizard('goForward');
                this.set('currentStep', this.$().smartWizard('currentStep'));
            }
        },
        goBackward: function() {
            this.$().smartWizard('goBackward');
            this.set('currentStep', this.$().smartWizard('currentStep'));
        },
        finish: function() {
            this.sendAction("finish");
        }
    }
});

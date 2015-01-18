import Ember from 'ember';

var Pikaday = window.Pikaday;

export default Ember.Component.extend({
    tagName: 'input',
    change: function() {

        if (!this.get('pikaday').getDate() && this.get('value')) this.set('value', null);
    },
    setupPikaday: function() {
        var that = this;

        var options = {
            field: this.$()[0],
            onSelect: function() {
                Ember.run(function() {
                    that.userSelectedDate();
                });
            },
            firstDay: 1,
            format: this.get('format') || 'LL'
        };

        options.i18n = {
            previousMonth: 'Önceki Ay',
            nextMonth: 'Sonraki Ay',
            months: moment.localeData()._months,
            weekdays: moment.localeData()._weekdays,
            weekdaysShort: moment.localeData()._weekdaysShort
        };

        var pikaday = new Pikaday(options);

        this.set('pikaday', pikaday);
        this.get('pikaday').setDate(this.get('value'), true);

    }.on('didInsertElement'),

    teardownPikaday: function() {
        this.get('pikaday').destroy();
    }.on('willDestroyElement'),

    userSelectedDate: function() {
        this.set('value', this.get('pikaday').getDate());
    },

    setDate: function() {
        this.get('pikaday').setDate(this.get('value'), true);
    }.observes('value')
});

export function initialize( /* container, application */ ) {
    Date.parseDate = function(input, format) {
        return moment(input, format).toDate();
    };
    Date.prototype.dateFormat = function(format) {
        return moment(this).format(format);
    };

    Ember.EasyForm.Input.reopen({
        inputOptions: ["minDate", "maxDate", "startDate"]
    });

    Ember.EasyForm.Config.registerInputType('datepicker', Ember.TextField.extend({
        attributeBindings: ["minDate", "maxDate"],
        didInsertElement: function() {
        	var dateInputFormat = 'DD/MM/YYYY';
        	var maxDateObject = (this.maxDate) ? moment(this.maxDate, dateInputFormat) : undefined;
        	var minDateObject = (this.minDate) ? moment(this.minDate, dateInputFormat) : undefined;
            var yearStart = (minDateObject) ? minDateObject.year() : 1960;
            var yearEnd = (maxDateObject) ? maxDateObject.year() : 2020;
            var defaultDate = (maxDateObject && maxDateObject < new Date()) ? new Date(yearEnd, moment().month(), moment().date()) : new Date();

            var picker = this.$().datetimepicker({
                format: 'DD MMMM YYYY',
                formatDate: dateInputFormat,
                lang: 'tr',
                timepicker: false,
                closeOnDateSelect: true,
                minDate: this.inputOptions.minDate,
                maxDate: this.inputOptions.maxDate,
                startDate: this.inputOptions.startDate,
                yearStart: yearStart,
                yearEnd: yearEnd,
                scrollMonth: false,
                scrollTime: false,
                scrollInput: false,
                defaultDate: defaultDate
            });

            this.$().unbind().blur(function() {
                picker.datetimepicker('destroy');
            })

            this.$().unbind().click(function() {
                picker.datetimepicker('show');
            });;

            var pickButton = $(
                    '<span class="input-group-btn"><button id="image_button" class="btn btn-default" type="button"><span class="fa fa-calendar"></button></span></span>')
                .click(function() {
                    picker.datetimepicker('show');
                });

            var inputGroupDiv = $('<div class="input-group"/>');
            var containerDiv = this.$().closest('div');
            inputGroupDiv.append(pickButton);
            containerDiv.find('input').appendTo(inputGroupDiv);
            containerDiv.prepend(inputGroupDiv);
        }
    }));
}

export default {
    name: 'ember-easy-form-datetimepicker',
    initialize: initialize
};

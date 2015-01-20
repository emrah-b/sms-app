import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function() {
        this.controller.set("reportTypes", this.store.find("report-type"));

        this.controller.set("reportCriteria", Ember.Object.createWithMixins(Ember.Validations.Mixin, {
            invalidDates: function() {
                if (this.get("endDate") < this.get("startDate"))
                    return true;
                else
                    return false;
            }.property("startDate", "endDate"),
            validations: {

                reportType: {
                    presence: true
                },
                startDate: {
                    presence: true
                },
                endDate: {
                    presence: true
                }
            }
        }));
    },
    actions: {
        submit: function() {
            var that = this;
            var reportType = that.controller.get("reportCriteria.reportType");
            var startDate = that.controller.get("reportCriteria.startDate");
            var endDate = that.controller.get("reportCriteria.endDate");

            if (endDate >= startDate) {
                var startDateString = moment(startDate).format("YYYYMMDD");
                var endDateString = moment(endDate).format("YYYYMMDD");
                that.transitionTo("report", reportType.get("id"), {
                    queryParams: {
                        start: startDateString,
                        end: endDateString
                    }
                });
            }
        }
    }
});

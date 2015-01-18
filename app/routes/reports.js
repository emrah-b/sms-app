import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function() {
        this.controller.set("reportTypes", this.store.find("report-type"));

        this.controller.set("reportCriteria", Ember.Object.createWithMixins(Ember.Validations.Mixin, {
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
        this.controller.set("reportDetail", false);
    },
    actions: {
        didTransition: function() {
            this.controller.set("reportDetail", false);
        },
        submit: function() {
            var that = this;
            this.controller.get("reportCriteria").validate().then(function() {
                var reportType = that.controller.get("reportCriteria").get("reportType");
                var startDate = that.controller.get("reportCriteria").get("startDate");
                var endDate = that.controller.get("reportCriteria").get("endDate");

                if (endDate >= startDate && reportType.get("code")) {
                    var startDateString = moment(startDate).format("YYYYMMDD");
                    var endDateString = moment(endDate).format("YYYYMMDD");
                    that.transitionTo("report", reportType.get("id"), {
                        queryParams: {
                            start: startDateString,
                            end: endDateString
                        }
                    });
                }
            });
        }
    }
});

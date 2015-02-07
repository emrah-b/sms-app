import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ["start", "end", "charts"],
    start: "",
    end: "",
    charts: false,
    startDate: function() {
        if (!this.get("start")) return new Date();
        return moment(this.get("start"), "YYYYMMDD")._d;
    }.property("start"),
    endDate: function() {
        if (!this.get("end")) return new Date();
        return moment(this.get("end"), "YYYYMMDD")._d;
    }.property("end"),
    arrangeMetadata: function() {
        var groupedBy = this.get("model.reportType.groupedBy");
        var filteredReportData = this.get("filteredReportData");

        if (groupedBy)  {
            this.set("groupedReport", true);
            var that = this;
            var metaData = Ember.A([]);

            filteredReportData.forEach(function(reportDataRow) {
                var smsList = Ember.A(reportDataRow.content);
               // var groupLabelResolver = that.groupLabelResolver(groupedBy, reportDataRow.key);

                metaData.push(Ember.Object.create({
                    resourceName: groupedBy,
                    keyId: reportDataRow.key,
                    keyName: "",//groupLabelResolver.fn.apply(that, groupLabelResolver.args),
                    messageCount: smsList.length,
                    linkable: that.isLinkable(groupedBy),
                    pendingCount: smsList.filterBy('status', 2).length,
                    sentCount: smsList.filterBy('status', 0).length,
                    failCount: smsList.filterBy('status', 1).length,
                    futureCount: smsList.filter(function(sms) {
                        return sms.sendDate > new Date();
                    }).length
                }));
            });

            this.set("reportData", metaData);

            this.set("reportCols", [
                {property:"keyId" ,label: "ID", sortable:true, linkToResource: true},
                {property:"keyName" ,label: this.getGroupNameByResourceName(groupedBy), sortable:true, hidden:true},
                {property:"messageCount" ,label: "Toplam Mesaj", sortable:true},
                {property:"pendingCount" ,label: "Beklemede", sortable:true},
                {property:"sentCount" ,label: "Gönderilmiş", sortable:true},
                {property:"failCount" ,label: "Başarısız", sortable:true},
                {property:"futureCount" ,label: "İleri tarihli", sortable:true},
            ]);
        }
        else{
            this.set("reportData", filteredReportData);
            this.set("reportCols", [
                {property:"transactionId" ,label: "İşlem Numarası", sortable:true},
                {property:"status" ,label: "Durum", sortable:true, smsStatusType: true},
                {property:"phoneNumber" ,label: "Numara", sortable:false, phoneType: true},
                {property:"sendDate" ,label: "Gönderilme Tarihi", sortable:true, dateType: true},
                {property:"timeValidity" ,label: "Geçerlilik Süresi (gün=", sortable:true},
            ]);
        }
    }.observes("filteredReportData.@each"),
    filterData: function() {
        if (!(this.get("startDate") instanceof Date)) return [];
        if (!(this.get("endDate") instanceof Date)) return [];

        var that = this;
        var applyDateFilterToSms = function(ctrl, list){
        	return list.filter(function(sms) {
                return Date.parse(sms.sendDate) >= ctrl.get("startDate") && Date.parse(sms.sendDate) <= ctrl.get("endDate");
            });
        };
        if (this.get("model.reportType.groupedBy")) {
            this.set("filteredReportData", this.get("model.reportData").map(function(dataRow) {
                return {
                    key: dataRow.key,
                    content: applyDateFilterToSms(that, dataRow.content)
                };
            }));
        } else {
            this.set("filteredReportData", applyDateFilterToSms(that, this.get("model.reportData")));
        }

    }.observes("model", "model.reportType.groupedBy", "startDate", "endDate"),
    getGroupNameByResourceName: function(resourceName){
        if(resourceName === "work-order") return "Gönderim Emri";
        if(resourceName === "status") return "Durum";
        if(resourceName === "originator") return "Başlık";
    },
    isLinkable: function(resourceName){
        if(resourceName === "work-order")
            return true;
    },
    actions: {
        toggleCharts: function(){
            this.toggleProperty("charts");
        }
    }

});

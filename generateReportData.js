var fs = require("fs");
var moment = require("moment");

var reportTypes = [{
    id: 1,
    name: "Bütün SMSler",
}, {
    id: 2,
    name: "Gönderim durumu özeti",
    groupedBy: "status"
}, {
    id: 3,
    name: "İleri tarihli SMSler",
}, {
    id: 4,
    name: "SMS Gönderim Emirleri",
    groupedBy: "work-order"
}, {
    id: 5,
    name: "Başlık bazında SMSler",
    groupedBy: "originator"
}]

var workOrders = [];
var smss = [];
var report1 = {id: 1, reportType: 1, reportData: []};
var report2 = {id: 2, reportType: 2, reportData: {}};
var report3 = {id: 3, reportType: 3, reportData: []};
var report4 = {id: 4, reportType: 4, reportData: {}};
var report5 = {id: 5, reportType: 5, reportData: {}};

function rnd(range, base) {
    if (!base) base = 0;
    return Math.floor(Math.random() * range + base);
}

(function generateData() {
    var smsId = 1;
    for (var i = 0; i < 30; i++) {
        var day = moment().subtract('days', i);

        workOrderName1 = ['Kampanya', "Dogum Gunu", "Yildonumu", "Fatura", "Indirim", "Borc"];
        workOrderName2 = ['Hatirlatma', "Uyari", "Mesaji", "Haberi", "Duyuru", "Genel"];
        validities = [1, 7, 30, 365];
        var sendDate = moment()

        if (i + 1 % 4 != 0) sendDate = moment().add('days', rnd(10, 1));

        var workOrder = {
            id: 30 - i,
            name: workOrderName1[rnd(6)] + " " + workOrderName2[rnd(6)],
            list: [],
            sendDate: sendDate,
            originator: rnd(4, 1),
            content: "Lorem ipsum dolores",
            sendMessagesPerMin: rnd(10, 3),
            timeValidity: validities[rnd(4)],
            transactionId: rnd(90000000, 10000000),
            createdAt: moment().subtract('days', i)
        };

        var numberOfMessages = rnd(10, 10);
        for (var j = 1; j <= numberOfMessages; j++) {
            var s = rnd(100);
            var status = (s > 60) ? 0 : (s > 10) ? 2 : 1;
            var numberPrefixes = ["549", "553", "532", "542", "533", "530", "555"];
            var phoneNumber = numberPrefixes[rnd(7)] + rnd(9000000, 1000000);

            var sms = {
                id: smsId++,
                status: status,
                phoneNumber: phoneNumber,
                message: "Lorem ipsum dolores",
                createdAt: moment().subtract('days', i),
                originator: rnd(4, 1),
                timeValidity: validities[rnd(4)],
                sendDate: moment().add(rnd(10), 'days'),
                transactionId: rnd(90000000, 10000000),
            };

            if(j % 3 == 0) {
            	sms.workOrder = 30 - i;
            	workOrder.list.push(sms.phoneNumber);
            	sms.sendDate = workOrder.sendDate;
            	sms.timeValidity = workOrder.timeValidity
            }

            smss.push(sms);
        }

        workOrders.push(workOrder);
    }
})()

function generateGroupedReport(smsList, attr){
	var reduced = smsList.reduce(function(report, curr) {
		if(!(attr in curr)) return report;

		if(curr[attr] in report) report[curr[attr]].push(curr);

		else report[curr[attr]] = [curr];

		return report;
	}, {})

    var reportData = [];

    Object.keys(reduced).forEach(function(key){
        reportData.push({key: key, content: reduced[key]});
    });

    delete reduce;
    return reportData;
}

function generateReports(){
	report1.reportData = smss;

    report2.reportData = generateGroupedReport(smss, "status");

	report3.reportData = smss.filter(function(sms){
		return Date.parse(sms.sendDate) > new Date();
	});

	report4.reportData = generateGroupedReport(smss, "workOrder");
	report5.reportData = generateGroupedReport(smss, "originator");
}


generateReports();

var reports = [report1, report2, report3, report4, report5];

var reportTypesString = JSON.stringify(reportTypes, null, 2);
var workOrdersString = JSON.stringify(workOrders, null, 2);
var smsString = JSON.stringify(smss);
var reportString = JSON.stringify(reports);

var fixtureLoaderTemplate = fs.readFileSync("report-fixture-loaders.js.template", "utf8");
var fileContent = fixtureLoaderTemplate
.replace('reportTypeFixtures', reportTypesString)
.replace('smsFixtures', smsString)
.replace('workOrderFixtures', workOrdersString)
.replace('reportFixtures', reportString)

fs.writeFileSync('app/initializers/report-fixture-loaders.js', fileContent);



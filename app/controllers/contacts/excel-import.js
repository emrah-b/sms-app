import Ember from 'ember';
import ExportData from 'kingmesaj/utils/export-data';
export default Ember.Controller.extend({
    queryParams: ["step"],
    step: 1,
    steps: function() {
        var currStep = this.get("step");
        return {
            downloadTemplate: currStep >= 1,
            upload: currStep >= 2,
            review: currStep >= 3,
            setGroupAndSave: currStep >= 4,
            next: currStep === 5
        };
    }.property("step"),
    fileNameChanged: function() {
        this.set("excelLoadError", null);
    }.observes("fileName"),
    fileChanged: function() {
        var data = this.get("excelData");
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        ///VALIDATION
        // TODO: externalize
        var sheet = workbook.Sheets[Object.keys(workbook.Sheets)[0]];
        var loadedHeaderRow = Object.keys(sheet).filter(function(cell) {
            return (cell.length === 2 && cell[1] === "1")
        }).map(function(cell) {
            return sheet[cell].v
        });
        this.get("emptyContact").getHeaderRow().then(function(standardHeaderRow) {
            if (!this.validateHeader(loadedHeaderRow, standardHeaderRow)) {
                this.set("excelLoadError", "Yüklenen dosya şablonla aynı formatta değil!");
                return;
            }

            var jsonArray = XLSX.utils.sheet_to_json(sheet);
            this.set("excelFileSize", jsonArray.length);
            this.set("contactsLoaded", 0);
            var storeContacts = [];
            jsonArray.forEach(function(newContact) {
                var newRecord = this.store.createRecord('contact', {
                    firstName: newContact["Adı"],
                    lastName: newContact["Soyadı"]
                });
                this.incrementProperty("contactsLoaded");
                storeContacts.pushObject(newRecord);
            }.bind(this));
            storeContacts.invoke('save');
        }.bind(this));
    }.observes("excelData"),
    validateHeader: function(loaded, standard) {
        if (loaded.length !== standard.length) return false;
        return standard.filter(function(sCell) {
            return !loaded.contains(sCell);
        }).length === 0;
    },
    actions: {
        downloadTemplate: function() {
            ExportData.exportToExcel([this.get("emptyContact")], "Kisiler.xlsx", {
                templateOnly: true
            });
            Ember.run.later(function() {
                if (this.get("step") < 2) this.set("step", 2);
            }.bind(this), 800);
        },
        moveTo: function(step) {
            this.set("step", step);
        }
    }
});

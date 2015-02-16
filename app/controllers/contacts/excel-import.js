import Ember from 'ember';
import ExportData from 'kingmesaj/utils/export-data';
export default Ember.Controller.extend({
    queryParams: ["step"],
    step: 1,
    newGroup: "",
    steps: function() {
        var currStep = this.get("step");
        return {
            downloadTemplate: currStep >= 1,
            upload: currStep >= 2,
            setGroupAndSave: currStep >= 3,
            next: currStep === 4
        };
    }.property("step"),
    groups: function() {
        return this.store.find('group');
    }.property(),
    fileNameChanged: function() {
        this.set("excelLoadError", null);
        if (Ember.isEmpty(this.get("fileName"))) {
            if (this.get("step") === 2) this.initializeStep(2);
            else this.set("step", 2);
        }
    }.observes("fileName"),
    fileChanged: function() {
        var data = this.get("excelData");
        if (!data) return;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        ///VALIDATION
        // TODO: externalize
        var sheet = workbook.Sheets[Object.keys(workbook.Sheets)[0]];
        var loadedHeaderRow = Object.keys(sheet).filter(function(cell) {
            return (cell.length === 2 && cell[1] === "1");
        }).map(function(cell) {
            return sheet[cell].v;
        });
        this.get("emptyContact").serialize().then(function(serializationMap) {
            var standardHeaderRow = serializationMap.labels;
            if (!this.validateHeader(loadedHeaderRow, standardHeaderRow)) {
                this.set("excelLoadError", "Yüklenen dosya şablonla aynı formatta değil!");
                return;
            }
            var jsonArray = XLSX.utils.sheet_to_json(sheet);
            this.set("numOfContacts", jsonArray.length);
            this.set("validContacts", []);
            this.set("invalidContacts", []);
            this.set("numOfContactsLoaded", 0);
            jsonArray.forEach(function(json) {
                var newRecord = this.store.createRecord('contact').fromJson(json, serializationMap);
                newRecord.validate().then(function() {
                    this.get("validContacts").push(newRecord);
                    this.incrementProperty("numOfContactsLoaded");
                }.bind(this), function() {
                    this.get("invalidContacts").push(newRecord);
                    this.incrementProperty("numOfContactsLoaded");
                }.bind(this));
            }.bind(this));
            if (jsonArray.length === 0) {
                this.set("excelLoadError", "Dosyada kişi bulunamadı");
            }
        }.bind(this));
    }.observes("excelData"),
    allContactsLoaded: function() {
        if (!this.get("numOfContacts")) return false;
        return this.get("numOfContactsLoaded") === this.get("numOfContacts");
    }.property("numOfContactsLoaded", "numOfContacts"),
    validateHeader: function(loaded, standard) {
        if (loaded.length !== standard.length) return false;
        return standard.filter(function(sCell) {
            return !loaded.contains(sCell);
        }).length === 0;
    },
    initializeStep: function(step) {
        if (step === 1) {}
        if (step <= 2) {
            this.set("fileName", null);
            this.set("excelData", null);
            this.set("numOfContacts", null);
            this.set("validContacts", null);
            this.set("invalidContacts", null);
            this.set("numOfContactsLoaded", null);
            this.set("excelLoadError", null);
        }
        if (step <= 3) {
            this.set("selectedGroup", null);
            this.set("newGroupText", null);
            this.set("newGroup", false);
            this.set("existingGroup", false);
            this.set("saveGroupError", null);
        }
    },
    stepChanged: function() {
        switch (this.get("step")) {
            case 3:
            case 4:
                if (!this.get("allContactsLoaded")) this.set("step", 2);
                break;
            case 4:
                if (!this.get("groupsSaved")) this.set("step", 3);
                break;
            default:
                this.initializeStep(this.get("step"));
                break;
        }
    }.observes("step"),
    assignGroupToValidContacts: function(group) {
        group.get("contacts").pushObjects(this.get("validContacts"));
        group.save();
        this.get("validContacts").forEach(function(contact) {
            contact.get("groups").then(function(groups) {
                groups.pushObject(group);
                contact.save();
            });
        });
        this.get("invalidContacts").invoke("destroy");
        this.set("savedGroupName", group.get("name"));
        this.set("groupSaved", true);
        this.set("step", 4);
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
        toggleErrorList: function() {
            this.toggleProperty("showErrorList");
        },
        setGroupPreference: function(preference) {
            this.set("saveGroupError", null);
            switch (preference) {
                case 1:
                    this.set("newGroup", false);
                    this.set("existingGroup", true);
                    break;
                case 2:
                    this.set("newGroup", true);
                    this.set("existingGroup", false);
                    break;
            }
        },
        moveTo: function(step) {
            this.set("step", step);
        },
        setGroupAndSave: function() {
            if (this.get("newGroup")) {
                if (!this.get("newGroupText")) {
                    this.set("saveGroupError", "Geçerli bir grup ismi giriniz");
                    return false;
                }
                var group = this.store.createRecord('group', {
                    name: this.get("newGroupText")
                });
                this.assignGroupToValidContacts(group);
            } else if (this.get("existingGroup")) {
                if (!this.get("selectedGroup")) {
                    this.set("saveGroupError", "Grup seçimi yapınız");
                    return false;
                }
                this.assignGroupToValidContacts(this.get("selectedGroup"));
            } else {
                return false;
            }
        }
    }
});

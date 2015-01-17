import Ember from 'ember';

export default Ember.Controller.extend({
    _groups: function() {
        return this.store.findAll("group");
    }.property(),
    groups: function() {
        return this.get("_groups").map(function(i) {
            return Ember.Object.create({
                id: i.get("id"),
                text: i.get("name"),
                group: i
            });
        });
    }.property("_groups.@each"),
    _contacts: function() {
        return this.store.findAll("contact");
    }.property(),
    contacts: function() {
        return this.get("_contacts").map(function(i) {
            return Ember.Object.create({
                id: i.get("id"),
                text: i.get("fullName"),
                contact: i
            });
        });
    }.property("_contacts.@each"),
    _originators: function() {
        return this.store.findAll("originator");
    }.property(),
    originators: function() {
        return this.get("_originators").map(function(i) {
            return Ember.Object.create({
                id: i.get("id"),
                text: i.get("title"),
                originator: i
            });
        });
    }.property("_originators.@each"),
    steps: function() {
        return [{
            title: "Liste oluşturma",
            description: "Liste oluşturma",
            template: "sms/list",
            onComplete: this.listComplete
        }, {
            title: "İçerik oluşturma",
            description: "İçerik oluşturma",
            template: "sms/content",
            onComplete: this.contentComplete
        }, {
            title: "Gönderim Ayarları",
            description: "Gelişmiş Ayarlar",
            template: "sms/options",
            onComplete: this.optionsComplete
        }, {
            title: "Onay",
            description: "Test mesajı ve onay",
            template: "sms/confirm"
        }];
    }.property(),
    updatePhoneList: function() {
        this.set("userHasEnteredData", true);
        var list = Ember.A();
        var addedGroups = this.model.get("addedGroups");
        var addedContacts = this.model.get("addedContacts");

        if (addedContacts) {
            addedContacts.forEach(function(c) {
                list.addObject({
                    number: c.contact.get("primaryPhoneNumber"),
                    name: c.contact.get("fullName")
                });
            });
        }

        if (addedGroups) {
            addedGroups.forEach(function(g) {
                g.group.get("contacts").forEach(function(contact) {
                    if (list.anyBy("number", contact.get("primaryPhoneNumber"))) return;

                    list.addObject({
                        number: contact.get("primaryPhoneNumber"),
                        name: contact.get("fullName")
                    });
                });

            });
        }

        this.model.set("phoneNumberList", list);

    }.observes("model.addedGroups.length", "model.addedContacts.length"),
    listComplete: function(controller, model) {
        if (model.get("phoneNumberList").length === 0) return false;

        var numberList = model.get("phoneNumberList").map(function(i) {
            return i.number;
        });

        model.set("list", numberList);

        return true;

    },
    contentComplete: function(controller, model) {
        if(!model.get("selectedOriginator")) return false;
        if(!model.get("message") || model.get("message").length < 1) return false;

        model.set("content", controller.get("model.message").trim());
        model.set("originator", controller.get("model.selectedOriginator").originator);

        return true;
    },
    optionsComplete: function(controller, model) {
        if(model.get("timeValidity")) {
            controller.set("timeValidityText", model.get("timeValidity").text);
            model.set("timeValidity", model.get("timeValidity").id);
        }

        return true;
    },
    phoneNumberList: function() {
        return Ember.A();
    }.property(),
    resetProperties: function() {
        this.set("userHasEnteredData", false);
    },
    actions: {
        finish: function(controller, model) {
            var _self = this;

            bootbox.confirm("Mesajınızı var olan ayarlarla kaydetmek istediğinize emin misiniz?", function(result) {
                if (!result) return;

                var newWorkOrder = _self.store.createRecord("work-order");

                newWorkOrder.set("list", _self.model.get("list"));
                newWorkOrder.set("sendDate", _self.model.get("sendDate") || new Date());
                newWorkOrder.set("originator", _self.model.get("originator"));
                newWorkOrder.set("content", _self.model.get("content"));
                newWorkOrder.set("timeValidity", _self.model.get("timeValidity"));
                newWorkOrder.set("sendMessagesPerMin", _self.model.get("sendMessagesPerMin"));
                newWorkOrder.set("status", 0);

                newWorkOrder.save();

                _self.resetProperties();
                _self.transitionToRoute("sms.complete");

            });
        }
    }
});

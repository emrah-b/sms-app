import Ember from 'ember';

export default Ember.View.extend({
    layoutName: 'modal',
    didInsertElement: function() {
        this.$('.modal').modal();
        var that = this;
        this.$(".modal").on("hidden.bs.modal", function() {
            that.get("controller").send(that.get("close") || "close");
        });
    },
    actions: {
        ok: function() {
            this.get("controller").send(this.get("ok") || "ok");

            $(".modal").modal('hide');
        }
    }
});

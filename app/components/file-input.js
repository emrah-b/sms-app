import Ember from 'ember';
export default Ember.TextField.extend({
    tagName: "input",
    type: "file",
    change: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.target.files;
        var i, f;
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function(e) {
                var data = e.target.result;
                /* if binary string, read with type 'binary' */
                this.set("binary", data);
            }.bind(this);
            reader.readAsBinaryString(f);
        }
    }
});

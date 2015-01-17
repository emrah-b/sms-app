/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import("bower_components/bootstrap/dist/css/bootstrap.min.css");
app.import("bower_components/select2/select2-bootstrap.css");
app.import("bower_components/select2/select2.css");
app.import("bower_components/select2/select2-spinner.gif");
app.import("bower_components/bootstrap/dist/js/bootstrap.min.js");
app.import('bower_components/moment/min/moment.min.js');
app.import('bower_components/moment/locale/tr.js');
app.import('bower_components/ic-styled/main.js');
app.import('bower_components/ember-utils/dist/globals/main.js');
app.import('bower_components/ember-components/dist/globals/main.js');
app.import('bower_components/select2/select2.min.js');
app.import('bower_components/select2/select2_locale_tr.js');
app.import('bower_components/dcjqaccordion/js/jquery.cookie.js');
app.import('bower_components/dcjqaccordion/js/jquery.dcjqaccordion.2.7.min.js');
app.import('bower_components/bootbox/bootbox.js');
app.import("bower_components/jQuery-Smart-Wizard/js/jquery.smartWizard.js");
app.import("bower_components/ember-easyForm/index.js");
app.import("bower_components/ember-validations/index.js");
app.import("bower_components/ember-i18n/lib/i18n.js");
app.import("bower_components/ember-i18n/lib/i18n-plurals.js");
app.import("bower_components/datetimepicker/jquery.datetimepicker.js");
app.import("bower_components/datetimepicker/jquery.datetimepicker.css");

app.import("vendor/plugins/perfect-scrollbar/src/perfect-scrollbar.css");
app.import("vendor/plugins/animate.css/animate.min.css");

app.import("vendor/plugins/perfect-scrollbar/src/jquery.mousewheel.js");
app.import("vendor/plugins/perfect-scrollbar/src/perfect-scrollbar.js");
app.import("vendor/plugins/jquery.scrollTo/jquery.scrollTo.min.js");
app.import("vendor/plugins/velocity/jquery.velocity.min.js");
app.import("vendor/plugins/jquery.sparkline/jquery.sparkline.js");

app.import('vendor/js/index.js');
app.import('vendor/js/main.js');

module.exports = app.toTree();

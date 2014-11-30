import Ember from 'ember';

function dateString(input) {
  return moment(input).format('LL');
}

export {
  dateString
};

export default Ember.Handlebars.makeBoundHelper(dateString);

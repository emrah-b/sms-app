import Ember from 'ember';

function date(input) {
  return moment(input).format('LL');
}

export {
  date
};

export default Ember.Handlebars.makeBoundHelper(date);

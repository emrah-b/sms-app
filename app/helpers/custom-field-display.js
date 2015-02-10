import Ember from 'ember';

function customFieldDisplay(value, type) {
  if(type !== "date")  return value;

  if(value && type === "date") return window.moment(value).format("L");
}

export {
  customFieldDisplay
};

export default Ember.Handlebars.makeBoundHelper(customFieldDisplay);

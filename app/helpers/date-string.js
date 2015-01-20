import Ember from 'ember';

function dateString(input) {
	if(!input) return "";
    return moment(input).format('LL');
}

export {
    dateString
};

export default Ember.Handlebars.makeBoundHelper(dateString);

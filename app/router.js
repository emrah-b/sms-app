import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('home', { path: "/"}, function() {
		
		this.resource('contacts', { path: "/contacts"}, function() {
			this.route('new');
			this.route('excel-import');
			this.route('excel-export');
		});	

		this.resource('groups', { path: "/groups"}, function() {
		});	
		this.resource('originators', {path: "/originators"});
		this.resource("edit-contact", {path: "contact/:id/edit"});
		
		this.resource('balance', {path: '/balance'});
		this.resource('reports', {path: '/reports'}, function () {
			this.resource('report', {path: ':id'})
		});

		

		this.resource('sms', {path: '/sms'}, function() {
			this.route("complete");
		});
  		this.resource('test-easyform', {path: "/test-easyform"});
	});

	this.route('login');
	this.route('logout');
});

export default Router;

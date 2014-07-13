import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';


export default Ember.Route.extend(ApplicationRouteMixin, {
	title: function() {
		return this.get('settings.siteName') + this.get('settings.urlSeparator') + this.get('settings.siteSlogan');
	},
});

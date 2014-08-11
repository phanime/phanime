import Ember from 'ember';

export default Ember.Route.extend({
	setupController:function(controller, anime) {
		controller.set('model', anime);
		// this.controllerFor('anime').set('coverTitle', anime.get('title'));		
		// this.controllerFor('anime').set('coversubTitle', '');
		// this.controllerFor('anime').set('coverClass', 'animeCover');
	}

});
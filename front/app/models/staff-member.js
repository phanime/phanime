import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	anime_id: belongsTo('anime'),
	// Will be used in templates since it makes more sense
	anime: Ember.computed.alias('anime_id'),
	
	person_id: belongsTo('person'),
	// Will be used in templates since it makes more sense
	person: Ember.computed.alias('person_id'),

	staff_position: attr('string'),
});
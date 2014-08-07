import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	language: attr(),
	role: attr(),
	person_id: belongsTo('person'),
	person: Ember.computed.alias('person_id'),
	character_id: belongsTo('character'),
	character: Ember.computed.alias('character_id'),
	anime_id: belongsTo('anime')
});

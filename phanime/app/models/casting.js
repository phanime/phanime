import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	language: attr(),
	role: attr(),
	person_id: belongsTo('person'),
	character_id: belongsTo('character'),
	anime_id: belongsTo('anime')
});

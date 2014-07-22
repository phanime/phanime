import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	anime_id: belongsTo('anime'),
	person_id: belongsTo('person'),
	staff_position: attr(),
});

Studios = new Meteor.Collection('studios');

StudiosSchema = new SimpleSchema({
	producerLogo: {
		type: String,
		label: "Producer Logo",
		optional: true,
	},
	name: {
		type: String,
		label: "Name"
	},
	slug: {
		type: String,
		label: "Slug",
		autoform: {
			disabled: true,
			value: null
		},
		optional: true
	},
	description: {
		type: String,
		label: "Description",
		autoform: {
			rows: 10
		},
		optional: true
	}
});
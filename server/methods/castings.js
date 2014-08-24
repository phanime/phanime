Meteor.methods({
	createCasting: function(casting) {
	    
	    check(casting, CastingsSchema);

	    // Auto value
	    casting.createdAt = new Date();

	    Castings.insert(casting, function(error, _id) {
	    	console.log(_id);
	    });

	    console.log(casting);
	}
});
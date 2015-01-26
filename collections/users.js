Meteor.users.helpers({

	displayName: function() {
		if (this.displayUsername) {
			return this.displayUsername;
		} else if (this.originalUsername) {
			return this.originalUsername;
		} else {
			return this.username;
		}
	},

	avatarImageUrl: function() {
		if (this.profile && this.profile.avatarImage) {
			return "http://cdn.phanime.com/images/users/avatar/" + this._id + "/" + this.profile.avatarImage;
		} else {
			return "http://cdn.phanime.com/images/site/na.gif";	
		}
	},
	profileBannerImageUrl: function() {
		if (this.profile && this.profile.profileBannerImage) {
			return "http://cdn.phanime.com/images/users/profileBanner/" + this._id + "/" + this.profile.profileBannerImage;
		} else {
			return "http://cdn.phanime.com/images/site/na.gif";	
		}

	},
	isAdmin: function() {
		return this.username === 'maaz' || this.username === 'lovabelle';
	},
	isModerator: function() {
		return this.username === 'maaz' || this.username === 'toki' || this.username === 'hippalectryon';
	},
	followerCount: function() {
		if (this.followers)
			return this.followers.length;
		else
			return 0;
	},
	followingCount: function() {
		if (this.following)
			return this.following.length;
		else
			return 0;
	}

});



Meteor.users.allow({

	update: function(userId, doc, fields, modifier) {

		// can only update if you're the user
		return doc._id === userId;

	}


});


// Since this collection is only for closed beta, we can add it in here  
RequestedInvites = new Meteor.Collection('requestedInvites');


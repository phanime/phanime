if (!(typeof MochaWeb === 'undefined')){
	MochaWeb.testOnly(function(){
		var expect = chai.expect;
		var should = chai.should;
		describe("LibraryEntry", function(){
			before(function() {
				// setup environment by creating a user

				// let's clear up any previous data we might have had
				Meteor.users.remove({});
				Anime.remove({});
				RequestedInvites.remove({});

				RequestedInvites.insert({used: false});

				var user = {
					username: "maaz",
					email: "maaz@gmail.com",
					password: "sup",
					profile: {
						signUpCode: RequestedInvites.findOne({used: false})._id
					}
				};

				Accounts.createUser(user);

				// Create an anime
				var anime = {
					canonicalTitle: "Test Anime Title",
					type: "TV",
					languageVersion: ["Subbed"],
					ageRating: "R - 17+ (violence & profanity)",
					genres: ["Adventure"],
					status: "Complete"
				};

				Anime.insert(anime);
			});
			describe("create", function(){
				before(function() {
					// Let's grab the user we created
					var userId = Meteor.users.findOne()._id;
					var animeId = Anime.findOne()._id;
					var canonicalTitle = Anime.findOne().canonicalTitle;
					var libraryEntry = {
						canonicalTitle: canonicalTitle,
						userId: userId,
						animeId: animeId,
						type: 'anime',
						status: 'Watching',
					};
					LibraryEntries.insert(libraryEntry);
				});
				it("should have a createdAt field", function() {
					var entry = LibraryEntries.findOne();
					expect(entry).to.be.an('object');
					expect(entry).to.have.property('createdAt').to.be.a('Date');
				});

				it("should not have an updatedAt field", function() {
					var entry = LibraryEntries.findOne();
					expect(entry).to.be.an('object');
					expect(entry).to.not.have.property('updatedAt');					
				});

				after(function() {
					// remove all libraryEntries created
					LibraryEntries.remove({});
				});
			});
			describe("update", function(){
				before(function() {
					// Let's grab the user we created
					var userId = Meteor.users.findOne()._id;
					var animeId = Anime.findOne()._id;
					var libraryEntry = {
						canonicalTitle: Anime.findOne().canonicalTitle,
						userId: userId,
						animeId: animeId,
						type: 'anime',
						status: 'Watching',
					};
					LibraryEntries.insert(libraryEntry);
				});
				it("should have an updatedAt field", function() {
					var entry = LibraryEntries.findOne();
					entry.status = 'Plan to watch';
					LibraryEntries.update({_id: entry._id}, {$set: {status: "Plan to watch"}});
					var entry = LibraryEntries.findOne();

					expect(entry).to.be.an('object');
					expect(entry).to.have.property('createdAt').to.be.a('Date');
					expect(entry).to.have.property('updatedAt').to.be.a('Date');
					expect(entry.createdAt.getTime()).to.be.below(entry.updatedAt.getTime());
				});

				after(function() {
					// remove all libraryEntries created
					LibraryEntries.remove({});
				});
			});

			describe("validateBefore", function() {
				it("shouldn't check for createdAt field", function() {
					var libraryEntry = {
						canonicalTitle: Anime.findOne().canonicalTitle,
						userId: Meteor.users.findOne()._id, // we could also use this.userId here I guess...
						animeId: Anime.findOne()._id,
						type: 'anime',
						status: "Watching",
					};

					// we need to make sure we clean the object before we validate it
					LibraryEntries.simpleSchema().clean(libraryEntry);
					var validation = LibraryEntries.simpleSchema().namedContext().validate(libraryEntry);
					var invalidKeys = LibraryEntries.simpleSchema().namedContext().invalidKeys();
					if (invalidKeys.length > 0)
						chai.assert(validation === true, "Validation before insert of library entry failed: " + invalidKeys[0].name + " is " + invalidKeys[0].type);

				});			
			});


			after(function() {
				// clean up all the documents we created
				Meteor.users.remove({});
				Anime.remove({});
				RequestedInvites.remove({});
			});
		});
	});
}
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
					var libraryEntry = {
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
					console.log(Meteor.users.find().fetch());
					console.log(Anime.find().fetch());
					var userId = Meteor.users.findOne()._id;
					var animeId = Anime.findOne()._id;
					var libraryEntry = {
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
					LibraryEntries.update({_id: entry._id}, {$set: entry});
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
			after(function() {
				// clean up all the documents we created
				Meteor.users.remove({});
				Anime.remove({});
				RequestedInvites.remove({});
			});
		});
	});
}
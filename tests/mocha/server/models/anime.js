if (!(typeof MochaWeb === 'undefined')){
	MochaWeb.testOnly(function(){
		var expect = chai.expect;
		var should = chai.should;
		describe("Anime", function(){
			describe("create", function(){
				var anime = {
					canonicalTitle: "Test Anime Title",
					type: "TV",
					languageVersion: ["Subbed"],
					ageRating: "R - 17+ (violence & profanity)",
					genres: ["Adventure"],
					status: "Complete"
				};

				before(function() {
					Anime.insert(anime);
				});
				
				it("should create anime 'Test Anime Title`", function() {
					var anime2 = Anime.findOne(anime);
					expect(anime2).to.be.an('object');
					for(var key in anime) {
						expect(anime2).to.have.property(key);
						expect(anime2[key]).to.deep.equal(anime[key]);
					}
				});

				// Check that it has autovalues or a lack there of.
				it("should have a createdAt field", function() {
					var anime = Anime.findOne();
					expect(anime).to.be.an('object');
					expect(anime).to.have.property('createdAt').to.be.a('Date');
				});

				it("should have a slug field", function() {
					var anime = Anime.findOne();
					expect(anime).to.be.an('object');
					expect(anime).to.have.property('slug').to.equal(getSlug(anime.canonicalTitle));
				});

				it("should NOT have an updatedAt field", function() {
					var anime = Anime.findOne();
					expect(anime).to.be.an('object');
					expect(anime).to.have.property('createdAt').to.be.a('Date');
				});


				it("check uniqueness of canonicalTitle", function(){

					// we're going to essentially insert an anime with the same title
					var anime = {
						canonicalTitle: "Test Anime Title",
						type: "Movie",
						languageVersion: ["Dubbed", "Subbed"],
						ageRating: "R - 17+ (violence & profanity)",
						genres: ["Adventure", "Action"],
						status: "Complete"
					};

					// Unique check
					chai.assert.throws(Anime.insert(anime), "Test Anime Title already exists (uniqueness passes)");



				});

				after(function() {
					Anime.remove({});
				});
			});

			describe("update", function(){
				before(function() {

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

				it("should have an updatedAt field", function() {
					var anime = Anime.findOne();
					Anime.update({_id: anime._id}, {$set: {type: "Movie"}});
					// Get the updated Anime 
					anime = Anime.findOne();

					expect(anime).to.be.an('object');
					expect(anime).to.have.property('createdAt').to.be.a('Date');
					expect(anime).to.have.property('updatedAt').to.be.a('Date');
					expect(anime.createdAt.getTime()).to.be.below(anime.updatedAt.getTime());
				});

				after(function() {
					// remove all anime created
					Anime.remove({});
				});				
			});
		});
	});
}
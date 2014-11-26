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

					chai.expect("1").to.be.a('string');

				});

				after(function() {
					Anime.remove({});
				});
			});
		});
	});
}
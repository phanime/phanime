Template.indexLayout.helpers({

  landingImage: function() {

    var gifs = [
    "http://cdn.phanime.com/images/site/homepage-images/1.jpg",
    "http://cdn.phanime.com/images/site/homepage-images/2.jpg",
    "http://cdn.phanime.com/images/site/homepage-images/3.jpg",
    "http://cdn.phanime.com/images/site/homepage-images/4.jpg",
    "http://cdn.phanime.com/images/site/homepage-images/5.jpg"
    ];

    var randGif = gifs[Math.floor(Math.random() * gifs.length)];

    return randGif;
  },

});

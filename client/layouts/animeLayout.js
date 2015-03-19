Template.animeLayout.helpers({
  getRatingHeight : function(pixels, ratingCount, totalRatings) {
    return (pixels * (ratingCount / totalRatings)).toFixed(2) + "px";
  },
  isRatingMature: function() {
    var anime = Template.instance().data;
    return anime.totalRatings > 10;
  }
});

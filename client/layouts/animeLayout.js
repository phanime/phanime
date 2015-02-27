Template.animeLayout.helpers({
  getRatingHeight : function(pixels, ratingCount, totalRatings) {
    return (pixels * (ratingCount / totalRatings)).toFixed(2) + "px"; 
  }
});

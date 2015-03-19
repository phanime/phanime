Template.adLeaderBoard.rendered = function() {
	$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;
		ads = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-3672352749447643" data-ad-slot="8516497906"></ins>';
		$('.adLeaderBoard').html(ads);
		return (adsbygoogle = window.adsbygoogle || []).push({});
	});
};
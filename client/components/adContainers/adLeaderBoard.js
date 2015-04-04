Template.adLeaderBoard.rendered = function() {
	var mobileAdBreakpoint = 750;
	$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
		var ads, adsbygoogle;

		if ($(window).width() > mobileAdBreakpoint) {
			ads = '<ins class="adsbygoogle" style="display: block;width:728px;height:90px; margin: 20px auto" data-ad-client="ca-pub-3672352749447643" data-ad-slot="8516497906"></ins>';
		} else {
			ads = '<ins class="adsbygoogle" style="display: block;width:320px;height:100px; margin: 20px auto" data-ad-client="ca-pub-3672352749447643" data-ad-slot="2792865109"></ins>';
		}

		$('.adLeaderBoard').html(ads);

		return (adsbygoogle = window.adsbygoogle || []).push({});
	});
};
$('.hamburger-menu').click(function(e){
	e.preventDefault()
	$('.nav-mobile').toggleClass('visible')
	$('body').toggleClass('mobile-nav-active')
	$(this).toggleClass('open')
});
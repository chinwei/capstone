(function() {
	var menuButton = document.getElementById('menu'),
		overlay = document.querySelector('div.overlay-container'),
	    
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay()
	{
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}
	function resizeImages()
	{

		$('.wrapper > .imgcontainer').height($(window).width()*0.390625);
		$('#team').height($(window).width()*0.2734375);
	}
	function smoothScroll()
	{
		$('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
		    {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length)
		      {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
    		}
  		});
	}

	function init()
	{
		smoothScroll();
		resizeImages();
	}

	menuButton.addEventListener('click', toggleOverlay );
	$('.overlay-close, nav ul li a').click(toggleOverlay);
	// closeButton.addEventListener('click', toggleOverlay );
	window.onresize = resizeImages;
	window.onload = init;
})();
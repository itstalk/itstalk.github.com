/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	
		$window.on('load', function() {
            
            // Play initial animations on page load.
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
            
		});

})(jQuery);

// Funcionalidade do dropdown do menu no cabeçalho da página
$(document).ready(function() {
    $( "#nav-dropdown-menu" ).click(function() {
        
        var $wrapper = $( "#nav-dropdown-wrapper" );
        
        if ($wrapper.hasClass( "hidden" )) {
            $wrapper.css( "display", "block" );
            
        } else {
            setTimeout(function() {
                $wrapper.css( "display", "none" );
            }, 550);
        }
        
        setTimeout(function() {
            $wrapper.toggleClass( "hidden visible" );
        }, 20);
    });
});
var handleHomeContentHeight = function() {
    $('#home').height($(window).height());
};

var handleAddCommasToNumber = function(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

var handlePageContainerShow = function() {
    $('#page-container').addClass('in');
};

var handlePageScrollContentAnimation = function() {
    $('[data-scrollview="true"]').each(function() {
        var myElement = $(this);
        var elementWatcher = scrollMonitor.create( myElement, 60 );

        elementWatcher.enterViewport(function() {
            $(myElement).find('[data-animation=true]').each(function() {
                var targetAnimation = $(this).attr('data-animation-type');
                var targetElement = $(this);
                if (!$(targetElement).hasClass('contentAnimated')) {
                    if (targetAnimation == 'number') {
                        var finalNumber = parseInt($(targetElement).attr('data-final-number'));
                        $({animateNumber: 0}).animate({animateNumber: finalNumber}, {
                            duration: 1000,
                            easing:'swing',
                            step: function() {
                                var displayNumber = handleAddCommasToNumber(Math.ceil(this.animateNumber));
                                $(targetElement).text(displayNumber).addClass('contentAnimated');
                            }
                        });
                    } else {
                        $(this).addClass(targetAnimation + ' contentAnimated');
                        setTimeout(function() {
                            $(targetElement).addClass('finishAnimated');
                        }, 1500);
                    }
                }
            });
        });
    });
};

var handleHeaderScrollToAction = function() {
    $('[data-click=scroll-to-target]').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('href');
        var headerHeight = 50;
        $('html, body').animate({
            scrollTop: $(target).offset().top - headerHeight
        }, 500);
        
        if ($(this).attr('data-toggle') == 'dropdown') {
            var targetLi = $(this).closest('li.dropdown');
            if ($(targetLi).hasClass('open')) {
                $(targetLi).removeClass('open');
            } else {
                $(targetLi).addClass('open');
            }
        }
    });
    $(document).click(function(e) {
        if (!e.isPropagationStopped()) {
            $('.dropdown.open').removeClass('open'); 
        }
    });
};

var sendMail = function() {

    $("#email").change(function() {
        $("#error-mail").hide();
    });


    $("#send").click(function() {
        var email = $("#email").val();
        if (!email.length) {
            $("#error-mail").show();
            return;
        }

        $("#error-mail").show().html('Enviando, aguarde ...');
        $("#send").attr('disabled', true);
        $.ajax({
            type: "POST",
            url: "http://pipedev.com.br/itstalk.php",
            data: {"email" : email},
            success: function(text) {
                $("#send").attr('disabled', false);
                if (text == 'success') {
                    $("#error-mail").show().html('Obrigado! Recebemos seu e-mail!');
                    $("#email").val('');
                    return;
                }

                $("#error-mail").show().html(text);
            }
        });
    });
}


var App = function () {
	"use strict";
	
	return {
		init: function () {
		    handleHomeContentHeight();
		    handlePageContainerShow();
		   // handlePageScrollContentAnimation();
            sendMail();
		}
  };
}();
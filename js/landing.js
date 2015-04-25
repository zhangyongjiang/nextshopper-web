jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

! function($) {

    $(function() {

        $('[data-ride="animated"]').addClass('invisible');
        $('[data-ride="animated"]').appear();
        $('[data-ride="animated"]').on('appear', function() {
            var $el = $(this),
                $ani = ($el.data('animation') || 'fadeIn'),
                $delay;
            if (!$el.hasClass('animated')) {
                $delay = $el.data('delay') || 0;
                setTimeout(function() {
                    $el.removeClass('invisible').addClass($ani + " animated");
                }, $delay);
            }
        });

        $(document).on('click.app', '[data-ride="scroll"]', function(e) {
            e.preventDefault();
            var $target = this.hash;
            $('html, body').stop().animate({
                'scrollTop': $($target).offset().top - 80
            }, 1000, 'easeInOutExpo', function() {
                window.location.hash = $target;
            });
        });

        jQuery('#contactUs').submit(function(event) {
            jQuery('#errorMessage').hide();
            event.preventDefault();
            if (jQuery('#name').val() == "" || jQuery('#email').val() == "" || jQuery('#subject').val() == "" || jQuery('#message').val() == "") {
                jQuery('#errorMessage').slideToggle('fast');
                jQuery('#errorMessage').html('Please provide all the fields.');
                return false;
            }
            var action = "https://api.nextshopper.com/ws/message/email-us";
            jQuery('#submit')
                .after('<img src="img/ajax-loader.gif" class="loader pull-right" />')
                .attr('disabled', 'disabled');

            var data = {
                'userName': jQuery('#name').val(),
                'from': jQuery('#email').val(),
                'subject': jQuery('#subject').val(),
                'content': jQuery('#message').val()
            };
            jQuery.ajax({
                url: action,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) {
                    if (data.msg && data.msg === 'ok') {
                        jQuery('#successMessage').slideToggle('fast');
                        jQuery('#successMessage').html('Your mail has been sent! We will contact you shortly.<br>Thank you');
                        jQuery('#contactUs').slideUp('fast');
                    } else {
                        jQuery('#errorMessage').slideToggle('fast');
                        jQuery('#errorMessage').html('Sorry! We are facing some technical problem right now, please try again later.');
                        jQuery('#submit').removeAttr('disabled');
                    }
                    jQuery('#contactUs img.loader').fadeOut('fast', function() {
                        jQuery(this).remove()
                    });
                },
                fail: function() {
                    jQuery('#errorMessage').slideToggle('fast');
                    jQuery('#errorMessage').html('Sorry! We are facing some technical problem right now, please try again later.');
                    jQuery('#contactUs img.loader').fadeOut('fast', function() {
                        jQuery(this).remove()
                    });
                    jQuery('#submit').removeAttr('disabled');
                }
            });
            return false;
        });
    });
}(window.jQuery);

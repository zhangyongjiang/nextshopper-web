jQuery(document).ready(function(){

	jQuery('#contactform').submit(function(){

		var action = jQuery(this).attr('action');

		jQuery("#message").slideUp(50,function() {
		jQuery('#message').hide();

 		jQuery('#submit')
			.after('<img src="ajax-contact-form/assets/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');

		jQuery.post(action, {
			name: jQuery('#name').val(),
			email: jQuery('#email').val(),
			comment: jQuery('#comment').val(),
			//verify: jQuery('#verify').val()
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				jQuery('#message').slideDown('fast');
				jQuery('#contactform img.loader').fadeOut('fast',function(){jQuery(this).remove()});
				jQuery('#submit').removeAttr('disabled');
				if(data.match('success') != null) jQuery('#contactform').slideUp('fast');
			}
		);

		});

		return false;

	});

});
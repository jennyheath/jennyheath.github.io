$(function(){
	$("#email-form").on("submit", function(event){
		event.preventDefault();

		var form = $(event.currentTarget);

		var source = form.find("#message-source");
		var email = form.find("#message-email");
		var name = form.find("#message-name");
		var message = form.find("#message-body");
		var nameIsValid = textValid(name);
		var emailIsValid = emailValid(email);
		var messageIsValid = textValid(message);

		if (nameIsValid && emailIsValid && messageIsValid){
			sendMessage(form, email, name, message, source);
		}
	});
});

function emailValid(email){
	if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email.val())){
		email.animate({backgroundColor:'white'}, 'slow');
		return true;
	}
	else {
		email.animate({backgroundColor:'#CD9B9B'}, 'slow');
		return false;
	}
}

function textValid(elem) {
	if (elem.val().length > 1) {
		elem.animate({backgroundColor:'white'}, 'slow');
		return true;
	} else {
		elem.animate({backgroundColor:'#CD9B9B'}, 'slow');
		return false;
	}
}

function sendMessage(form, email, name, message, source){

	var button = form.find('input[type="submit"]');
	button.attr('disabled', 'disabled');
	button.val("Sending...");

	$.ajax({
		method: "POST",
		url: "http://asheremailer.herokuapp.com/root",
		data: {
			mail: {
				source: source.val(),
				email: email.val(),
				crossDomain: true,
				name: name.val(),
				message: message.val(),
			},
		},
		success: function(){
			button.val("Sent!");
		},
		error: function(xhr, error) {
			console.log(error);
			button.removeAttr("disabled");
			button.val("Couldn't send.  Try again?");
		}
	});
}

$("ul").on("click", "li", function(event) {
	$(this).toggleClass('completed');
});

$("ul").on("click", "li span", function(event) {
	/* Act on the event */
	$(this).parent().fadeOut('400', function() {
		$(this).remove();	
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
	/* Act on the event */
	if(event.which === 13){
		var newtodo = $(this).val();
		$("ul").append("<li><span>X</span>"+newtodo+"</li>");
		$(this).val("");
	}
});
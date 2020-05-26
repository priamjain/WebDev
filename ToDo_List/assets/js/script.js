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
		$("ul").append("<li><span><i class='fas fa-trash'></i></span>"+newtodo+"</li>");
		$(this).val("");
	}
});

$(".fa-plus").click(function(event) {
	/* Act on the event */
	$("input[type='text']").slideToggle('500');
	$(".fa-plus").toggleClass('rotate');
	
});

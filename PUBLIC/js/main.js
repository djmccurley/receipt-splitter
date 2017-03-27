var receiptSubtotal = 0;
var categorySubtotal = 0;
$(document).ready(function() {
	var numberOfCategories = document.getElementsByClassName("category_inputs").length;
	var allCategories = [];
	

	//UI functions
	//show/hide help info
	$('.help_btn').click(function() {
		$('.help_info').slideToggle();
	});
	//add a category (by cloning 1st category module - .clone(true) copies div AND event handlers)
	$('.add_btn_mobile').click(function(){
		$('.category_module:eq(0)').clone(true).appendTo('.category_wrapper');
	});
	//delete categories
	$('.delete_btn').click(function() {
		if(document.getElementsByClassName("category_module").length > 1) {
			$(this).parent().parent().remove();	
		}
		else {
			console.log('There must be at least 1 category');
		}
	});

	//Math functions
	
	for (i=1; i<=numberOfCategories; i++) {
		console.log(numberOfCategories);
		categorySubtotal = 0;
		$('.category_module:eq(0)').children().each(function(i) {
			console.log('hello');
			categorySubtotal += $('this').val();
			console.log(categorySubtotal);
		});
		
	}

});	
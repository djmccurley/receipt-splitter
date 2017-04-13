$(document).ready(function() {
	//call sumCategory when user leaves input field - better than keydown as won't fire as often
	var currentTaxToAdd = 0;
	$("input[type='number']").blur(sumCategory);
	$("input[type='checkbox']").click(calculateTax);


	//---Math functions---
	function sumCategory() {
		//adds all inputs in category to array
		calculateTax();
		var categoryInputs = $(this).parent().children();
		var categoryTotal = 0;
		//iterates through array, adds values to categoryTotal
		for (i=0; i<categoryInputs.length; i++) {
			currentInputValue = parseFloat(categoryInputs[i].value);
			//checks for NaN, as NaN doesn't equal itself in js
			if (currentInputValue !== currentInputValue) {
				console.log('Input' + (i+1) + "is NaN");
			} else {
					categoryTotal += currentInputValue;
				}
		}
		//console.log(categoryTotal);
		//cuts to 2 decimal places
		categoryTotal += currentTaxToAdd;
		categoryTotal = categoryTotal.toFixed(2);

		$(this).parent().siblings(".output_field").html("<p>" + categoryTotal + "</p>");
		$(this).siblings(".output_field").find("#receipt_total").text(categoryTotal);
		combineSubtotals();
	}

	function combineSubtotals() {
		var allCategories = $(".category_module").find(".output_field").children();
		console.log(allCategories);
		var allSubtotals = 0;
		//iterates through array, adds values to allsubtotals
		for (i=0; i<allCategories.length; i++) {
			currentSubtotal = parseFloat(allCategories[i].innerText);
			console.log(currentSubtotal);
			//checks for NaN, as NaN doesn't equal itself in js
			if (currentSubtotal !== currentSubtotal) {
				console.log('Subtotal' + (i+1) + "is NaN");
			} else {
					allSubtotals += currentSubtotal;
				}
		}
		//console.log(categoryTotal);
		//cuts to 2 decimal places
		allSubtotals = allSubtotals.toFixed(2);
		$(".receipt_inputs").find("#subtotal").text(allSubtotals);
		checkBalance();
	}

	// TAX function:
	// 1) check N of tax inputs checked, divide tax input field by that
	// 2) tax input box clicked - run checker (1) again, recalculate current category
	//		> sumCategory(this.sibling(.category_inputs).first-child);
	//
	//IF all inputs full, add another (.text('<input type....'))

	function calculateTax(){
		//gets current tax input total
		var currentTaxTotal = $("#tax_field").val();
		//checks number of categories with tax includied
		var taxCategoriesCount = $("input[type='checkbox']:checked").length;
		/*var inputToSend = $(this).siblings(".category_inputs").children("input:first-child");*/
		console.log(taxCategoriesCount + "is the number of categories");
		console.log(currentTaxTotal);
		//divides tax total by number of categories
		currentTaxToAdd = (currentTaxTotal / taxCategoriesCount);
		console.log(currentTaxToAdd);
	}

	function checkBalance(){
		var subtotal = $("#subtotal").text();
		var receiptTotal = $("#receipt_total").text();
		console.log(subtotal);
		if (subtotal === receiptTotal) {
			$(".receipt_inputs").children(".output_field").removeClass("unbalanced").addClass("balanced");
		} else if (subtotal !== receiptTotal) {
			$(".receipt_inputs").children(".output_field").removeClass("balanced").addClass("unbalanced");
		}
	}

	//---UI functions---
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
		combineSubtotals();
	});

});	
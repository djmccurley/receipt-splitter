$(document).ready(function() {
	//call sumCategory when user leaves input field - better than keydown as won't fire as often
	$("input[type='number']").blur(updaterLoop);
	$("input[type='checkbox']").click(updaterLoop);


	//---Math functions---

/*	On blur/click:

function
	check tax total
	divide by # of boxes checked

get array of all categories
	loop through arrays:
		for each one:
			sum up entries
			if box is checked
				add tax total
			if not, add 0 total
			output to total
	after looping through, do subtotal calc
		output to receipt box*/

	function updaterLoop() {
		var currentTaxToAdd = calculateTax();
		console.log("Adding " + currentTaxToAdd + " to each checked category");

		var allModules = $(".form_module");
		console.log(allModules.length + " Form Modules total");

		for (i=0; i<allModules.length; i++) {
			var thisCategory = $(allModules[i]);
			var categoryInputs = thisCategory.find("input[type='number']");
			var categoryCheckbox = thisCategory.find("input[type='checkbox']");
			console.log("there rae" + categoryInputs.length + " inputs in this #" + i);
			var categoryTotal = 0;
			for (j=0; j<categoryInputs.length; j++) {
				currentInputValue = parseFloat(categoryInputs[j].value);
				//checks for NaN, as NaN doesn't equal itself in js
				if (currentInputValue !== currentInputValue) {
					console.log('Input' + (i+1) + "is NaN");
				} else {
						categoryTotal += currentInputValue;
					}
			}
		if ((categoryCheckbox.is(':checked')) && (currentTaxToAdd)) {
				categoryTotal += parseFloat(currentTaxToAdd);
				console.log("added " + currentTaxToAdd + " to total for category " + i);
			} else {
				console.log("no tax added to category " + i);
			}
			categoryTotal = categoryTotal.toFixed(2);
			if (i === 0) {
				thisCategory.find("#receipt_total").text(categoryTotal); 
			} else {
				thisCategory.find(".output_field").html("<p>" + categoryTotal + "</p>");
				}
		}
		combineSubtotals();
	}


	function combineSubtotals() {
		var allCategories = $(".category_module").find(".output_field").children();
		console.log("this is all categores:" + allCategories);
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
		console.log(taxCategoriesCount + " is the number of categories with tax");
		//divides tax total by number of categories, returns two decimal format
		return (currentTaxTotal / taxCategoriesCount).toFixed(2);
		
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
		updaterLoop();
	});
	//delete categories
	$('.delete_btn').click(function() {
		if(document.getElementsByClassName("category_module").length > 1) {
			$(this).parent().parent().remove();	
		}
		else {
			console.log('There must be at least 1 category');
		}
		updaterLoop();
	});

});	
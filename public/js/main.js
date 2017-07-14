$(document).ready(function() {
	$(".target").change(function() {
		$.post("/result", function (res) {
 			//do something
 		});
 	});
});
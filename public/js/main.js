$(document).ready(function() {
	$(".target").on("keyup", function() {
		var query = {
			search: $(this).val()
		}

		$.post("/result", query, function (res) {
			var matches = res.result;
		});
	});
});

			// if(matches === undefined){
			// 	$('#result').append('<p>We dont have any matching users in our database, sorry!</p>')

			// }
			// else{
			// 	$('#result').append('<p>Your search came up with the following matching users:</p>')
			// 		var mList = $('ul.list');
					
			// 		$.each(matches, function(i) {
			// 			var li = $('<li/>')
			// 				.appendTo(mList);
			// 			var p = $('<p/>')
			// 				.addClass('ui-all')
			// 				.text(matches[i].firstname+" "+matches[i].lastname)
			// 				.appendTo(li);
			// 		});
			// };
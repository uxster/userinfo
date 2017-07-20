$(document).ready(function() {

	$(".target").on("keyup", function() {
		var query = {
			search: $(this).val()
		}

		function postRequest() {
			$.post("/matches", query, function (res) {
				var result = res.result;

			 	$("#result").html("<ul/>");

				for(var i = 0; i < result.length; i++){
					$("#result ul").append("<li>" + result[i].firstname + " " + result[i].lastname + ": " + result[i].email + "</li>");
				};
			});
		};

		setTimeout(postRequest, 300);

	});

});

						
// if (query.search.includes("")) {
// 	$('#result').html('<p>Start typing to search for users.</p>')
// }
// if(result.length === 0){
// 		$('#result').html('<p>We dont have any matching users in our database, sorry!</p>')
// 	}
// console.log(typeof query.search + " " + query.search + "!");
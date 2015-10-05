// $(document).ready(function() {
// 	var ajax = $.get('https://api.yelp.com/v2/search?term=golf&location=Los+Angeles')
// 	.done(function(responseJSON) {
// 		console.log(responseJSON);
// 		$.each(responseJSON, function(index, course) {
// 			$("ul#courses").append('<li>' + course.name + '</li>');
// 		});
// 	});
// });

var COURSES = [];

$(document).ready(function() {
	$.get('https://api.yelp.com/v2/search', function(response, status) {
		if (status == 'success') {
			COURSES = response;
			initPage();
		}
	});
});

var initPage = function() {
	var coursesContainer = $('#coursesContainer');

	var emptyCourses = function() {
		coursesContainer.empty();
	};

	var coursesTemplate = _.template($('.courses-template').html());

	$('#search-button').click(function(e) {
		e.preventDefault();
		emptyCourses();

		var resultCourses = $.get('http://api.yelp.com/v2/search?term=golf&location' + $('#search-term').val())
		.done(function(responseJSON) {
			console.log(responseJSON);
		});
	});
};
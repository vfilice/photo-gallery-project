$(document).ready(function(){
	//When a user cliks on an image
	var $overlay = $('<div id="overlay"></div>');
	var $image = $("<img>");
	var $caption = $("<p></p>");
	var $nextBtn = $("<div id=next-btn></div>");
	var $prevBtn = $("<div id=prev-btn></div>");

	$overlay.append($image); // append the image to the overlay
	$overlay.append($caption); // append the caption to the overlay
	$overlay.append($prevBtn); // append the caption to the overlay
	$overlay.append($nextBtn); // append the caption to the overlay
	$('body').append($overlay);// append the overlay to the body

	//Create a click event that listens for when an image is pressed and when
		//an image is pressed show the overlay
	$(".square a").click(function(event){
		event.preventDefault();
		//Create a variable that holds the href attribute of the 'a' tag
		var imageLocation = $(this).attr("href"); 
		var imagePosition = $('#overlay img').position();

		$image.attr("src", imageLocation) //Add the attribute to image

		$overlay.show(); //Show the overlay

		//Create a variable that holds the alt tag value of the image child
		var captionText = $(this).children("img").attr("alt");
	  	$caption.text(captionText); //Put the text in the 'p' tag

	});

	//When overlay is clicked, overlay is hidden
	$("#overlay").click(function(){
		$(this).hide();
	});
});
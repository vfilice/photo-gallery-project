$(document).ready(function(){
	//When a user cliks on an image
	var $overlay = $('<div id="overlay"></div>');
	var $image = $("<img>");
	var $caption = $("<p></p>");
	var $nextBtn = $("<div id=next-btn></div>");
	var $prevBtn = $("<div id=prev-btn></div>");
	var $overlayBg = $('<div id="overlay-bg"></div>');
	var $lastClickedCol = null;

	$overlay.append($image); // append the image to the overlay
	$overlay.append($caption); // append the caption to the overlay
	$overlay.append($prevBtn); // append the caption to the overlay
	$overlay.append($nextBtn); // append the caption to the overlay
	$overlay.append($overlayBg);
	$('body').append($overlay);// append the overlay to the body

	//Create a click event that listens for when an image is pressed and when
		//an image is pressed show the overlay
	$(".col").click(function(event){
		event.preventDefault();
		//Create a variable that holds the href attribute of the 'a' tag
		var imageLocation = $(this).find("a").attr("href");
		$image.attr("src", imageLocation) //Add the attribute to image

		$lastClickedCol = $(this);

		$overlay.show(); //Show the overlay

		//Create a variable that holds the alt tag value of the image child
		var captionText = $(this).find("img").attr("alt");
	  	$caption.text(captionText); //Put the text in the 'p' tag

	});

	//When the user clicks on an arrow when the overlay is present 
	$('#next-btn').click(function() {
	//Change the image to the next or previous one depending on which button they click
		//Somehow get the next div's 'a' tag href 
	//Make a variable that tracks what they clicked in

		//Finding all the .col children of portfolio-wrapper and putting them in an array
		var $portfolioChildren = $(".portfolio-wrapper").children(".col");
		//We get the current images attribute href
		var currImage = $lastClickedCol.find("a").attr("href");
		//We get the next images attribute href
		var nextImage = $lastClickedCol.next().find("a").attr("href");
		//We get the first item in the array and make it into a jQuery object
		var $firstImage = $($portfolioChildren[0]);
		//We get the href of the first image
		var $firstImageHref = $firstImage.find("a").attr("href"); // Were making firstImage into a jQuery object
		//This finds the length of portfolio children
		var $portfolioArr = $portfolioChildren.length;
		//Using the length of the array we minus it by one and find the last item in the array.
			//And get its href attribute
		var $lastImage = $($portfolioChildren[ $portfolioArr - 1 ]).find("a").attr("href"); // This is a condensed version similiar to first image
		//we make the HTML string into a jQuery object
		console.log($lastImage);
		console.log(currImage);

		//If the last image has the same href as each other
		if ( $lastImage == currImage ){
			//Resets lastclicked to the begining
			console.log("You are on the last one");
			$lastClickedCol = $firstImage;
			//Populates the lightbox img with the first one
			$image.attr("src", $firstImageHref);
		} else {
			//Sets the last clicked column to the next image which is now going to 
			//currently display in the lightbox
			$lastClickedCol = $($lastClickedCol).next();
			//Sets it in the lightbox
			$image.attr("src", nextImage);
		}		
	});

		//When the user clicks on an arrow when the overlay is present 
	$('#prev-btn').click(function() {
	//Change the image to the next or previous one depending on which button they click
		//Somehow get the next div's 'a' tag href 
	//Make a variable that tracks what they clicked in
		console.log($lastClickedCol); 

		var prevImage = $lastClickedCol.prev().find("a").attr("href");
		console.log(prevImage);
		$lastClickedCol = $($lastClickedCol).prev();
		console.log($lastClickedCol); 
		$image.attr("src", prevImage)
		$overlay.show();
	});
	

	//When overlay is clicked, overlay is hidden
	$("#overlay-bg").click(function(){
		$("#overlay").hide();
	});

	
});
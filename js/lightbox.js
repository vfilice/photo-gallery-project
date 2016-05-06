$(document).ready(function() {
	var $overlay = $('<div id="overlay"></div>'); //This will contain the lighbox
	var $image = $("<img>"); //This will contain the appropriate image
	var $iframe = $('<iframe></iframe>'); //This will contain the iframe for the video player
	var $caption = $("<p></p>"); //This will contain the caption text
	var $nextBtn = $("<div id=next-btn></div>"); //This will contain the button to go to the next image
	var $prevBtn = $("<div id=prev-btn></div>"); //This will contain the button to go to the previous image
	var $overlayBg = $('<div id="overlay-bg"></div>'); //This will contain the space to click so the user can exit the lightbox
	
	var $lastClickedCol = null; //This will track which '.col' div the user is currently on
	var $portfolioChildren = $(".portfolio-wrapper").children(".col");//Find all the .col children of portfolio-wrapper and put them in an array

	//This function checks if the link is a video or image
	var getVideoOrImage = function() {
		//If it's a video get the video link attribute and make it the iframe src
		if ( $lastClickedCol.find("a").attr("href") == "#" ) {
			$iframe.attr("src", $lastClickedCol.find("a").attr("video-link"));
			//Replace the overlay image with the iframe
			$("#overlay img").replaceWith($iframe);
		} else {
			//Clear the image cache
			$image.attr("src", '');
			//This checks if the iframe is showing and replaces it with the image
			$("#overlay iframe").replaceWith($image);
			//The src of the image will be the href of the lastClickedCol
			$image.attr("src", $lastClickedCol.find("a").attr("href"));
		}
	}

	//This function returns the caption for the current image
	var getCaptionText = function() {
		if ($lastClickedCol.is(":visible")) {
			return $lastClickedCol.find("img").attr("alt");
		}
	}
	
	//This function gets the next image when called	
	var getNextImage = function() {

		var nextItems = $lastClickedCol.nextAll(":visible");//Get all the visible next items of $lastClickedCol
		var length_nextItems = nextItems.length;//Find the length of nextItems
		
		//If the length is greater than 0, we aren't on the last image 
		if(length_nextItems > 0){
			//Set the lastClickedCol to the first item in nextItems
			$lastClickedCol = $(nextItems[0]);
			//Call the function to see if it's an image or video and set it in the lightbox
			getVideoOrImage();
		} else {
			//We are on the last image so find the first visible item in list
			var $firstVisible = $($(".portfolio-wrapper").children(".col:visible")[0]);
			//Set the lastClickedCol to $firstVisible
			$lastClickedCol = $firstVisible;
			//Call the function to see if it's an image or video and set it in the lightbox
			getVideoOrImage();
		}
		//Get the caption text by running the $captionText function that finds the img alt tag
			//of the lastClickedCol and returns its value
		var nextCaptionText = getCaptionText();
	  	$caption.text(nextCaptionText); 	
	}

	//This function gets the previous image when called	
	var getPrevImage = function() {

		var prevItems = $lastClickedCol.prevAll(":visible");//Get all the visible previous items of $lastClickedCol
		var length_prevItems = prevItems.length;//Find the length of prevItems

		//If the length is greater than 0, we aren't on the first image 
		if ( length_prevItems > 0 ){
			//Set the lastClickedCol to the first item in prevItems
			$lastClickedCol = $(prevItems[0]);
			//Call the function to see if it's an image or video and set it in the lightbox
			getVideoOrImage();
		} else {
			//We are on the first image so find the last visible item in the list
			var $visibleChildren = $(".portfolio-wrapper").children(".col:visible");
			var $lastVisible = $($visibleChildren[ $visibleChildren.length - 1 ]);
			//Set the lastClickedCol to $lastVisible
			$lastClickedCol = $lastVisible;
			//Call the function to see if it's an image or video and set it in the lightbox
			getVideoOrImage();
		}
		//Get the caption text by running the $captionText function that finds the img alt tag
			//of the lastClickedCol and returns its value
		var prevCaptionText = getCaptionText();
	  	$caption.text(prevCaptionText); 
	}

	$overlay.append($image);//append the image to the overlay
	$overlay.append($caption);//append the caption to the overlay
	$overlay.append($prevBtn);//append the prevBtn to the overlay
	$overlay.append($nextBtn);//append the nextBtn to the overlay
	$overlay.append($overlayBg);//append the overlayBg to the overlay
	$('body').append($overlay);//append the overlay to the body

	//Create a click event that listens for when an image is pressed
	$(".col").click(function(event){
		event.preventDefault();//Prevent the default browser behaviour from happening
		
		var imageLocation = $(this).find("a").attr("href"); //Create a variable that holds the href attribute of the 'a' tag

		//This conditional checks if the link is a video or image
		if (imageLocation == "#") {
			$iframe.attr("src", $(this).find("a").attr("video-link"));
			//If it's a video get the video link attribute and make it the iframe src
			$("#overlay img").replaceWith($iframe);
		} else {
			//This checks if the iframe is showing and replaces it with the image
			$("#overlay iframe").replaceWith($image);
			$image.attr("src", imageLocation)//The value of imageLocation will be the location of the image
		}

		$lastClickedCol = $(this);//Set the counter to the current 'col' div

		$overlay.show();//Show the overlay

		//Get the current caption for the image from the alt tag
		var captionText = $(this).find("img").attr("alt");
	  	$caption.text(captionText);//Put the text in the 'p' tag

	});

	// When the user clicks on the next arrow when the overlay is present 
	$('#next-btn').click(function() {	
		getNextImage();	
	});

	//When the user clicks on the previous arrow 
	$('#prev-btn').click(function() {
		getPrevImage();
	});

	//When the user presses the arrow keys
	$("body").keydown(function (e){
		if(!$overlay.is(":hidden")){
			if(e.which == 37) { // left arrow
				getPrevImage();
			}
	    	else if(e.which == 39) { // right arrow
	    		getNextImage();
	    	}
		} 
	});	

	//When overlay is clicked, overlay is hidden
	$("#overlay-bg").click(function(){

		//This conditional checks if the iframe is visible
		if ($iframe.is(":visible")) {
			//If it is visible clear its src attribute, so the video stops playing when hidden
			$iframe.attr("src", "");
		}

		$("#overlay").hide();
	});

	//This functions returns the user's input into the search box
	var getInputVal = function( a ) {
		return $("#search").val();
	};

	$("#search").keyup(function(e) {
		
		var colCaptions;//Holds the captions

		//This loop iterates through all the children in .portfolio-wrapper div
		for ( var i = 0; i < $portfolioChildren.length; i ++ ) {
			var $colList = $($portfolioChildren[i]);//Stores each iteration through $portfolioChildren
			var searchVal = getInputVal();//Stores the user's input
			// console.log($colList);
			colCaptions = $colList.find("img").attr("alt");
			// console.log(colCaptions);
			//Conditional looks to see if the value stored in colCaptions matches with searchVal
			if ( colCaptions.toLowerCase().indexOf(searchVal.toLowerCase()) > -1 ) {
				//Only run this code block if it's a match, show() the image/s
				$colList.fadeIn(1000);
			} else {
				//Run this code block if it isn't a match, hide() the .col of the respective images
				$colList.fadeOut(800);
			}
		}

	});

});

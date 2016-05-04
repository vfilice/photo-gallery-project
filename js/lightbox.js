$(document).ready(function() {
	var $overlay = $('<div id="overlay"></div>'); //This will contain the lighbox
	var $image = $("<img>"); //This will contain the appropriate image
	var $caption = $("<p></p>"); //This will contain the caption text
	var $nextBtn = $("<div id=next-btn></div>"); //This will contain the button to go to the next image
	var $prevBtn = $("<div id=prev-btn></div>"); //This will contain the button to go to the previous image
	var $overlayBg = $('<div id="overlay-bg"></div>'); //This will contain the space to click so the user can exit the lightbox
	
	var $lastClickedCol = null; //This will track which '.col' div the user is currently on
	var $portfolioChildren = $(".portfolio-wrapper").children(".col");//Find all the .col children of portfolio-wrapper and put them in an array
	var $firstImage = $($portfolioChildren[0]);//Get the first item in the array and make it into a jQuery object
	var $firstImageHref = $firstImage.find("a").attr("href");//Find the href of the $firstImage
	var $portfolioLength = $portfolioChildren.length;//Find the length of portfolio children
	var $lastImage = $($portfolioChildren[ $portfolioLength - 1 ]);//Using the length of the array we minus it by one and find the last item in the array and make it into a jQuery object
	var $lastImageHref = $lastImage.find("a").attr("href"); //Find the href of the $lastImage

	//This function returns the caption for the current image
	var getCaptionText = function() {
		if ($lastClickedCol.is(":visible")) {
			return $lastClickedCol.find("img").attr("alt");
		}
	}
	
	//This function gets the next image when called	
	var getNextImage = function() {
		//Get the current image's href
		var currImage = $lastClickedCol.find("a").attr("href");

		//If the last image and the current image have the same href
		if ( $lastImageHref == currImage ){
			//Reset lastClickedCol to the begining
			//console.log("You are on the last one");
			$lastClickedCol = $firstImage;
			//Populate the lightbox img with the first image
			$image.attr("src", $firstImageHref);
		} else {
			//Set the lastClickedCol to the next image
			$lastClickedCol = $($lastClickedCol.nextAll(":visible")[0]);
			//Get the next image's attribute href
			var nextImage = $lastClickedCol.find("a").attr("href");
			//Set it in the lightbox
			$image.attr("src", nextImage);
		}
		//Get the caption text by running the $captionText function that finds the img alt tag
			//of the lastClickedCol and returns its value
		var nextCaptionText = getCaptionText();
	  	$caption.text(nextCaptionText); 	
	}

	//This function gets the previous image when called	
	var getPrevImage = function() {

		var currImage = $lastClickedCol.find("a").attr("href");

		console.log($firstImageHref);
		console.log(currImage);

		//If the first image and the current image have the same href
		if ( $firstImageHref == currImage ){
			//Set lastClickedCol to the last image
			// console.log("You are on the first one");
			$lastClickedCol = $lastImage;
			//Populate the lightbox with the last image
			$image.attr("src", $lastImageHref);
		} else {
			//Set the lastClickedCol to the previous image
			$lastClickedCol = $($lastClickedCol.prevAll(":visible")[0]);
			//Get the previous image's attribute href
			var prevImage = $lastClickedCol.find("a").attr("href");
			//Set it in the lightbox
			$image.attr("src", prevImage)
		}

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
		$image.attr("src", imageLocation)//The value of imageLocation will be the location of the image

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
				$colList.show(); 
			} else {
				//Run this code block if it isn't a match, hide() the .col of the respective images
				$colList.hide();
			}
		}

	});

});

/* When the image reaches the last image when no defined first and last image is present it does
not loop through

When a first image or last image is present, the other not contained in the search may appear as 
loop through
 */

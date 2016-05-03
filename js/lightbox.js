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
	var $portfolioArr = $portfolioChildren.length;//Find the length of portfolio children
	var $lastImage = $($portfolioChildren[ $portfolioArr - 1 ]);//Using the length of the array we minus it by one and find the last item in the array and make it into a jQuery object
	var $lastImageHref = $lastImage.find("a").attr("href"); //Find the href of the $lastImage


	var getCaptionText = function() {
		return $($lastClickedCol).find("img").attr("alt");
	}//This function returns the caption for the current image
		
	var getNextImage = function() {
		//Get the current image's href
		var currImage = $lastClickedCol.find("a").attr("href");
		//Get the next image's attribute href
		var nextImage = $lastClickedCol.next().find("a").attr("href");
		
		console.log($lastImageHref);
		console.log(currImage);

		//If the last image and the current image have the same href
		if ( $lastImageHref == currImage ){
			//Reset lastClickedCol to the begining
			//console.log("You are on the last one");
			$lastClickedCol = $firstImage;
			//Populate the lightbox img with the first image
			$image.attr("src", $firstImageHref);
		} else {
			//Set the lastClickedCol to the next image
			$lastClickedCol = $($lastClickedCol).next();
			//Set it in the lightbox
			$image.attr("src", nextImage);
		}
		//Get the caption text by running the $captionText function that finds the img alt tag
			//of the lastClickedCol and returns its value
		var nextCaptionText = getCaptionText();
	  	$caption.text(nextCaptionText); 	
	}

	var getPrevImage = function() {

		var currImage = $lastClickedCol.find("a").attr("href");
		var prevImage = $lastClickedCol.prev().find("a").attr("href");

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
			$lastClickedCol = $($lastClickedCol).prev();
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


	
});
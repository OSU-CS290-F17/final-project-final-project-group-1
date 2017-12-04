
console.log("index.js Launches with success");
var photoContainer = document.getElementsByClassName('photo-container');
var lengthOfPhotos = photos.childElementCount;
var photoTitle = document.getElementsByClassName('photo-title'); 
var update = document.getElementById('search-button');

//Function for the update button on the search bar.
update.onclick = function (){
	var passText = document.getElementById('search-text').value;

	if (!passText){
		console.log("Bar Empty");
		
	}//end of if
	
	else{
		console.log(passText);
		loopCheckText(passText);
	}//end of else
}//end of update.onclick

//checks the lists of photos for photos with the title text entered.
function loopCheckText(passed){
	passed = passed.toLowerCase();
	console.log("Passed:", passed);
	lengthOfPhotos = photos.childElementCount;
	var i = 0;
	var postTitle;
	var photoList = document.getElementsByClassName('photo-container');
	for (i = 0 ; i < lengthOfPhotos; i++){
		//console.log("Post's Text: ", photoList[i].getElementsByClassName('photo-title')[0].textContent);
		
		photoTitle = (photoList[i].getElementsByClassName('photo-title')[0].textContent);
		console.log("Comparing:", photoTitle, " >= ", passed);
		photoTitle = photoTitle.toLowerCase();
		console.log("photo's title:" , photoTitle);
		if( (photoTitle.indexOf(passed) ) == (-1) ){
			photoList[i].style.display = "none";
		}//end of if
	}//end of for
}

//var passText = document.getElementById('search-text').value;
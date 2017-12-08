// Heart button implementation

var allLoveButtons = document.getElementsByClassName('love-button');
var allLoveCounts = document.getElementsByClassName('love-count');


function updateLoveCount(num) {

    var loveCount = parseInt(allLoveCounts[num].textContent);  //get current count
    var currentState = allLoveCounts[num].getAttribute("data-state"); //get current state of love button
    var currentPhoto = allPhotoContainerElems[num];
    allLoveCounts[num].remove(); //remove current count from DOM

    var postRequest = new XMLHttpRequest();
    var postURL = '/:' + currentPhoto.titleText + '/upvote';
    postRequest.open('POST', postURL, true);


	  postRequest.addEventListener('load', function (event) {
    if (event.target.status !== 200) {
      alert("Error sending upvote request:\n\n\n" + event.target.response);
    } else {//apply upvote
      if (currentState === "off") {
          loveCount += 1;
          currentState = "on";     // mark button as currently on
      }

      else {
          loveCount -= 1;
          currentState = "off";    // mark button as currently off
      }

    // console.log("upvote successful!");
		// var voteCount = parseInt(document.getElementsByClassName('post-score')[0].textContent);
		// voteCount++;
		// document.getElementsByClassName('post-score')[0].textContent = voteCount;

      }
    });
	postRequest.send();

    console.log('Post #: ', num);
    console.log('loveCount==', loveCount);
    console.log('currentState==', currentState);
    console.log('--------');

    //Put updated count and state of love button back into DOM
    var newSpan = document.createElement('span');
    newSpan.classList.add('love-count');
    newSpan.setAttribute('data-state', currentState);
    var updatedCount = document.createTextNode(loveCount);
    newSpan.appendChild(updatedCount);
    allLoveButtons[num].appendChild(newSpan);
}


function respondToLoveButton(buttonId) {
    return function(e) {
        e.currentTarget.classList.toggle('loveButtonHighlighted');
        updateLoveCount(buttonId);
    }
}

for (var i = 0; i < allLoveButtons.length; i++) {
    allLoveButtons[i].addEventListener('click', respondToLoveButton(i));
}


// Most Loved button implemetation

var mostLovedButton = document.getElementById('most-loved-button');

function respondToMostLovedButton() {

    var loveCount;
    var max = 0;
    for(var i = 0; i < allLoveCounts.length; i++) {
        loveCount = parseInt(allLoveCounts[i].textContent);  //get current count

        if(loveCount > max) {
            max = loveCount;
        }
    }

}

mostLovedButton.addEventListener('click', respondToMostLovedButton);



var allPhotoContainerElems = [];

function showUploadModal() {

  var showUploadModal = document.getElementById('upload-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showUploadModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}

function hideUploadModal() {

  var showUploadModal = document.getElementById('upload-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showUploadModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearUploadModalInputs();

}

function clearUploadModalInputs() {

  var modalInputElements = document.querySelectorAll('#upload-modal input')
  for (var i = 0; i < modalInputElements.length; i++) {
    modalInputElements[i].value = '';
  }
  var imgPreview = document.getElementById('my-img');
  imgPreview.src = '';

}

// function getPhotoId() {
//   var currentURL = window.location.pathname;
//   var urlComponents = currentURL.split('/');
//   if (urlComponents[0] === "" && urlComponents[1] === "photos") {
//     return urlComponents[2];
//   } else {
//     return null;
//   }
// }


//closes the modal and implements the createPhotoElement func
function handleModalAcceptClick() {

  var titleText = document.getElementById('photo-title-input').value.trim();
  var photoURL = document.getElementById('my-img').src.trim();

  if (!titleText || !photoURL) {
    alert("You must fill in all of the fields!");
  }
  else {

    var postRequest = new XMLHttpRequest();
    var postURL = "/:" + titleText + "/addPhoto";
    postRequest.open('POST', postURL);

    var photoObj = {
      title: titleText,
      photoURL: photoURL,
			loveCount: 0
    };
    var requestBody = JSON.stringify(photoObj);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
      if (event.target.status !== 200) {
        alert("Error storing photo in database:\n\n\n" + event.target.response);
      } else {

        var newPhotoElem = createPhotoElement(titleText, photoURL);
        var photoContainer = document.querySelector('photo-container');
        photoContainer.insertAdjacentHTML('beforeend', newPhotoElem);

      }
    });

    postRequest.send(requestBody);

    hideUploadModal();
  }
}

//uses photoTemplate to create a new dogPost and sets the values of said post
function createPhotoElement(title, photoURL) {

	var photoTemplateArguments = {
    photoURL: photoURL,
	  title: title,
	  loveCount: 0
  };

    var postHTML = Handlebars.templates.photoTemplate(photoTemplateArguments);
	  console.log("== postHTML:", postHTML);



    return postHTML;
}//end of photo template

window.addEventListener('DOMContentLoaded', function () {

  var photoContainerElems = document.getElementsByClassName('photo-container');
  for (var i = 0; i < photoContainerElems.length; i++) {
    allPhotoContainerElems.push(photoContainerElems[i]);
  }

  var uploadButton = document.getElementById('upload-button');
  uploadButton.addEventListener('click', showUploadModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideUploadModal);
  }
});//end of window

document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.getElementById('my-img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
          // img.onload = imageIsLoaded; // optional onload event listener
      }
  });//end of doc.querySelector


// Get the modal
var modal = document.getElementById('upload-modal');


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        hideUploadModal();
    }
}


console.log("index.js Launches with success");
var photoContainer = document.getElementsByClassName('photo-container');
var lengthOfPhotos = photos.childElementCount;
var photoTitle = document.getElementsByClassName('photo-title');
var update = document.getElementById('search-button');


//Function for the update button on the search bar.
update.onclick = function (){
	var passText = document.getElementById('search-text').value;

	if (!passText){
		//console.log("Bar Empty");
		loopReveal();
	}//end of if

	else{
		console.log(passText);
		loopCheckText(passText);
	}//end of else
}//end of update.onclick


//checks the lists of photos for photos with the title text entered.
function loopCheckText(passed){
	loopReveal();
	passed = passed.toLowerCase();
	console.log("Passed:", passed);
	lengthOfPhotos = photos.childElementCount;
	var i = 0;
	var postTitle;
	var photoList = document.getElementsByClassName('photo-container');
	for (i = 0 ; i < lengthOfPhotos; i++){

		console.log("Photo's Text: ", photoList[i].getElementsByClassName('photo-title')[0].textContent);
		photoTitle = (photoList[i].getElementsByClassName('photo-title')[0].textContent);
		photoTitle = photoTitle.toLowerCase();
		if( (photoTitle.indexOf(passed) ) == (-1) ){
			photoList[i].style.display = "none";
		}//end of if
	}//end of for
}


function loopReveal(){
	lengthOfPhotos = photos.childElementCount;
	var i = 0;
	var postTitle;
	var photoList = document.getElementsByClassName('photo-container');
	for (i = 0 ; i < lengthOfPhotos; i++){
		photoList[i].style.display = "inline-block";
	}//end of for
}
//var passText = document.getElementById('search-text').value;

// function used to sort posts according to popular tags
var tagvar = document.getElementsByClassName('popular-tag');

for(var i = 0; i < tagvar.length; i++){
tagvar[i].addEventListener('click', function(){

    var tag = this.textContent;

    console.log(tag);

loopCheckText(tag);


});}

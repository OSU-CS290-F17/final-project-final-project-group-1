// Heart button implementation

var allLoveButtons = document.getElementsByClassName('love-button');
var allLoveCounts = document.getElementsByClassName('love-count');


function updateLoveCount(num) {

    var loveCount = parseInt(allLoveCounts[num].textContent);  //get current count
    var currentState = allLoveCounts[num].getAttribute("data-state"); //get current state of love button
    allLoveCounts[num].remove(); //remove current count from DOM

    if (currentState === "off") {
        loveCount += 1;
        currentState = "on";     // mark button as currently on
    }

    else {
        loveCount -= 1;
        currentState = "off";    // mark button as currently off
    }

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

  // clearUploadModalInputs();

}

function clearSellSomethingModalInputs() {

  var postTextInputElements = [
    document.getElementById('photo-title-input'),
    document.getElementById('my-img'),
  ];

  postTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });

  var checkedPostConditionButton = document.querySelector('#post-condition-fieldset input[checked]');
  checkedPostConditionButton.checked = true;

}

function handleModalAcceptClick() {

  var titleText = document.getElementById('photo-title-input').value.trim();
  var photoURL = document.getElementById('my-img').src.trim();

  if (!titleText || photoURL == "#") {
    alert("You must fill in all of the fields!");
  }
  else {

    var newPhotoElem = createPhotoElement(titleText, photoURL);
    allPhotoContainerElems.push(newPhotoElem);

    var photosSection = document.getElementById('photos');
    photosSection.appendChild(newPhotoElem);

    hideUploadModal();

  }

}


function createPhotoElement(itemText, photoURL) {

  var photoDiv = document.createElement('div');
  photoDiv.classList.add('photo-container');

  var photoContentsDiv = document.createElement('div');
  photoContentsDiv.classList.add('photo-contents');
  photoDiv.appendChild(photoContentsDiv);

  var photoTitleLink = document.createElement('a');
  photoTitleLink.classList.add('photo-title');
  photoTitleLink.href = '#';
  photoTitleLink.textContent = itemText;
  photoContentsDiv.appendChild(photoTitleLink);

  var photoImageContainerDiv = document.createElement('div');
  photoImageContainerDiv.classList.add('photo-image-container');
  photoContentsDiv.appendChild(photoImageContainerDiv);

  var photoImg = document.createElement('img');
  photoImg.src = photoURL;
  photoImg.alt = itemText;
  photoImageContainerDiv.appendChild(photoImg);

  // var spaceText1 = document.createTextNode(' ');
  // photoInfoContainerDiv.appendChild(spaceText1);
  //
  // var spaceText2 = document.createTextNode(' ');
  // photoInfoContainerDiv.appendChild(spaceText2);

  return photoDiv;

}

window.addEventListener('DOMContentLoaded', function () {

  var photoContainerElems = document.getElementsByClassName('photo-container');
  for (var i = 0; i < photoContainerElems.length; i++) {
    allPhotoContainerElems.push(photoContainerElems[i]);
  }

  // var filterCitySelect = document.getElementById('filter-city');
  // var filterCityOptions = filterCitySelect.querySelectorAll('option:not([selected])');
  // for (var i = 0; i < filterCityOptions.length; i++) {
  //   allCities.push(filterCityOptions[i].value.trim().toLowerCase());
  // }

  var uploadButton = document.getElementById('upload-button');
  uploadButton.addEventListener('click', showUploadModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideUploadModal);
  }

  // var filterUpdateButton = document.getElementById('filter-update-button');
  // filterUpdateButton.addEventListener('click', filterUpdate)

  // var imgSelectButton = document.querySelector('input[type="file"]')
  // imgSelectButton.addEventListener('upload', uploadImg);

});

document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.getElementById('my-img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
          // img.onload = imageIsLoaded; // optional onload event listener
      }
  });

// function uploadImg() {
//   var img = document.getElementById('my-img');  // $('img')[0]
//   img.src = URL.createObjectURL(); // set src to file url
// }

// Get the modal
var modal = document.getElementById('upload-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        hideUploadModal();
    }
}


// window.addEventListener('load', function() {
//
// });

// function imageIsLoaded(e) { alert(e); }


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

  // clearUploadModalInputs();

}

// function clearSellSomethingModalInputs() {
//
//   var postTextInputElements = [
//     document.getElementById('post-text-input'),
//     document.getElementById('post-photo-input'),
//     document.getElementById('post-price-input'),
//     document.getElementById('post-city-input')
//   ];
//
//   postTextInputElements.forEach(function (inputElem) {
//     inputElem.value = '';
//   });
//
//   var checkedPostConditionButton = document.querySelector('#post-condition-fieldset input[checked]');
//   checkedPostConditionButton.checked = true;
//
// }

function handleModalAcceptClick() {

  var titleText = document.getElementById('photo-title-input').value.trim();
  var photoURL = document.getElementById('my-img').src.trim();

  if (!titleText || !photoURL) {
    alert("You must fill in all of the fields!");
  }
  else {

    var newPhotoElem = createPhotoElement(titleText, photoURL);
    
	var photoContainer = document.querySelector('.photo-container');

    photoContainer.insertAdjacentHTML('beforeend', newPhotoElem);

    hideUploadModal();

  }

}
/*
function insertNewPost(title, photoURL,) {
	
	var postTemplateArguments = {
    photoURL: photoURL,
	title: title
  };

	var photoHTML = Handlebars.templates.postTemplate(postTemplateArguments);
	console.log("== postHTML:", photoHTML);

  
    var posts = document.getElementById('posts');
    posts.insertAdjacentHTML('beforeend', postHTML);
	
}*/

function createPhotoElement(title, photoURL) {
	
	var photoTemplateArguments = {
    photoURL: photoURL,
	title: title
  };

    var postHTML = Handlebars.templates.dogTemplate(photoTemplateArguments);
	console.log("== postHTML:", postHTML);

  
    var posts = document.getElementById('posts');
    posts.insertAdjacentHTML('beforeend', postHTML);
  /*

  var photoDiv = document.createElement('div');
  photoDiv.classList.add('photo-container');

  var photoContentsDiv = document.createElement('div');
  photoContentsDiv.classList.add('photo-contents');
  photoDiv.appendChild(photoContentsDiv);

  var photoTitleLink = document.createElement('a');
  photoTitleLink.classList.add('photo-title');
  photoTitleLink.href = '#';
  photoTitleLink.textContent = title;
  photoContentsDiv.appendChild(photoTitleLink);

  var photoImageContainerDiv = document.createElement('div');
  photoImageContainerDiv.classList.add('photo-image-container');
  photoContentsDiv.appendChild(photoImageContainerDiv);

  var photoImg = document.createElement('img');
  photoImg.src = photoURL;
  photoImg.alt = title;
  photoImageContainerDiv.appendChild(photoImg);

  // var spaceText1 = document.createTextNode(' ');
  // photoInfoContainerDiv.appendChild(spaceText1);
  //
  // var spaceText2 = document.createTextNode(' ');
  // photoInfoContainerDiv.appendChild(spaceText2);

  return photoDiv;*/

}

window.addEventListener('DOMContentLoaded', function () {

  var photoContainerElems = document.getElementsByClassName('photo-container');
  for (var i = 0; i < photoContainerElems.length; i++) {
    allPhotoContainerElems.push(photoContainerElems[i]);
  }

  // var filterCitySelect = document.getElementById('filter-city');
  // var filterCityOptions = filterCitySelect.querySelectorAll('option:not([selected])');
  // for (var i = 0; i < filterCityOptions.length; i++) {
  //   allCities.push(filterCityOptions[i].value.trim().toLowerCase());
  // }

  var uploadButton = document.getElementById('upload-button');
  uploadButton.addEventListener('click', showUploadModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideUploadModal);
  }

  // var filterUpdateButton = document.getElementById('filter-update-button');
  // filterUpdateButton.addEventListener('click', filterUpdate)

  // var imgSelectButton = document.querySelector('input[type="file"]')
  // imgSelectButton.addEventListener('upload', uploadImg);

});

document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.getElementById('my-img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
          // img.onload = imageIsLoaded; // optional onload event listener
      }
  });

// function uploadImg() {
//   var img = document.getElementById('my-img');  // $('img')[0]
//   img.src = URL.createObjectURL(); // set src to file url
// }

// Get the modal
var modal = document.getElementById('upload-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        hideUploadModal();
    }
}


// window.addEventListener('load', function() {
//
// });

// function imageIsLoaded(e) { alert(e); }

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

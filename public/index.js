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
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var photoTags = document.getElementById('photo-tags-input').value.trim();

  if (!titleText || !photoURL || !photoTags) {
    alert("You must fill in all of the fields!");
  }
  else {

    var newPhotoElem = createPhotoElement(titleText, photoURL, photoTags);
    allPhotoElems.push(newPhotoElem);

    var photosSection = document.getElementById('photos');
    photosSection.appendChild(newPhotoElem);

    hideSellSomethingModal();

  }

}


function createPostElement(itemText, photoURL, photoTags) {

  var photoDiv = document.createElement('div');
  photoDiv.classList.add('photo-container');

  var photoContentsDiv = document.createElement('div');
  photoContentsDiv.classList.add('photo-contents');
  photoDiv.appendChild(photoContentsDiv);

  var photoImageContainerDiv = document.createElement('div');
  photoImageContainerDiv.classList.add('photo-image-container');
  photoContentsDiv.appendChild(photoImageContainerDiv);

  var photoImg = document.createElement('img');
  photoImg.src = photoURL;
  photoImg.alt = itemText;
  photoImageContainerDiv.appendChild(photoImg);



  var photoTagsContainerDiv = document.createElement('div');
  photoTagsContainerDiv.classList.add('photo-tag-container');
  photoContentsDiv.appendChild(photoTagsContainerDiv);

  var tagInputs = photoTags.split(",");
  for (var i = 0; i < tagInputs.length; i++) {
    var photoTag = tagInputs[i];
  }

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

  // var modalAcceptButton = document.getElementById('modal-accept');
  // modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideUploadModal);
  }

  // var filterUpdateButton = document.getElementById('filter-update-button');
  // filterUpdateButton.addEventListener('click', filterUpdate)

  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[1]) {
          var img = document.querySelector('img');  // $('img')[1]
          img.src = URL.createObjectURL(this.files[1]); // set src to file url
          img.onload = imageIsLoaded; // optional onload event listener
      }
  });

});

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

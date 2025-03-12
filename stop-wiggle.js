//////////// PLAY/STOP BTN WIGGLE ANIMATION DEPENDING FOCUS STATE ////////

// Select all form fields
const formFields = document.querySelectorAll('.summit-form__field');

// Select the button where you want to add the class
const wiggleButton = document.querySelector('.is--wiggle-btn');

// Function to add the class when focus is outside of a field
function addAnimationClass() {
  wiggleButton.classList.add('is--play-wiggle-animation');
}

// Function to remove the class when focus is on a field
function removeAnimationClass() {
  wiggleButton.classList.remove('is--play-wiggle-animation');
}

// Function to reset the transformation after the animation ends
function resetTransform() {
  wiggleButton.style.transform = 'rotateZ(0deg)';
}

// Loop through all the form fields and add focus and blur event listeners
formFields.forEach(field => {
  field.addEventListener('focus', removeAnimationClass);
  field.addEventListener('blur', addAnimationClass);
});

// Add a transitionend event listener to reset the transformation
wiggleButton.addEventListener('transitionend', resetTransform);
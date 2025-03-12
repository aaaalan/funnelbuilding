
//////////// REMOVE AUTOFOCUS FIELD ON MOBILE ////////

window.addEventListener("load", function() {
    // Detect the screen width
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;

    // Select the input element
    const inputElement = document.querySelector('input[name="name"]');

    // Check if the screen width is less than or equal to 768px (mobile)
    if (screenWidth <= 768) {
        // Remove the autofocus attribute
        inputElement.removeAttribute("autofocus");
        
        // Remove focus from the input element
        inputElement.blur();
    }
});
const CookieService = {
    setCookie(name, value, minutes) {
        let expires = '';
        if (minutes) {
            const date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + ';';
    },

    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            if (cookie.indexOf(name + '=') > -1) {
                return cookie.split('=')[1];
            }
        }
        return null;
    }
};

const cooldownMinutes = 180; // Set the cooldown period in minutes
const popupCooldownCookie = 'popupCooldownGo'; // Cookie name for the cooldown
const exitPopup = document.querySelector('.popup');

// Check if cooldown cookie exists
const shouldShowPopup = () => !CookieService.getCookie(popupCooldownCookie);

const exit = (e) => {
    const shouldExit =
        [...e.target.classList].includes('popup') || // user clicks on mask
        [...e.target.classList].includes('exit-popup') ||       // user clicks on the close icon
        e.keyCode === 27;                                        // user hits escape
    if (shouldExit) {
        exitPopup.classList.remove('visible');
        // Set the cooldown cookie when the popup is closed
        CookieService.setCookie(popupCooldownCookie, true, cooldownMinutes);
    }
};

const showPopup = () => {
    if (shouldShowPopup()) {
        exitPopup.classList.add('visible');
        CookieService.setCookie('exitIntentShowngo1', true, 30); // Existing cookie logic
    }
};

const mouseEvent = (e) => {
    const shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;
    if (shouldShowExitIntent) {
        document.removeEventListener('mouseout', mouseEvent);
        showPopup();
    }
};

const touchEvent = (e) => {
    const shouldShowExitIntent = e.clientY < 10;
    if (shouldShowExitIntent) {
        showPopup();
    }
};

const isTouchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isTouchDevice) {
    exitPopup.classList.add('on-mobile');
}

function myScrollSpeedFunction() {
    if (exitPopup.classList.contains('on-mobile')) {
        if (my_scroll() < -100) {
            showPopup();
        }
    }
}

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        showPopup();
    }
});

var my_scroll = (function () {
    var last_position, new_position, timer, delta, delay = 50;
    function clear() {
        last_position = null;
        delta = 0;
    }
    clear();
    return function () {
        new_position = window.scrollY;
        if (last_position != null) {
            delta = new_position - last_position;
        }
        last_position = new_position;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
})();

// Event listeners for popup triggers
setTimeout(() => {
    document.addEventListener('mouseout', mouseEvent);
    document.addEventListener('touchmove', touchEvent);
    document.addEventListener('touchend', touchEvent);
    document.addEventListener('keydown', exit);
    document.addEventListener('scroll', myScrollSpeedFunction);
    document.querySelector('.popup').addEventListener('click', exit);
    document.querySelector('.exit-popup').addEventListener('click', function(){
        exit();
    });
}, 0);
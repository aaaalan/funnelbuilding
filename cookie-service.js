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

export { CookieService };
